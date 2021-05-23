import { Client } from 'pg';
import { dbOptions } from '@libs/db';
import { DBError } from '@libs/error-types';
import { ProductDB } from '@libs/interfaces';

export const createDbProducts = async (products: ProductDB[]): Promise<{success: boolean}> => {
  const client = new Client(dbOptions);

  let prodValueIndex = 1;
  let prodValues = [];
  let prodValuesSets = [];
  let queryProd = `
    INSERT INTO products (
      sku,
      title,
      description,
      price,
      created_date,
      updated_date
    )
    VALUES
  `;

  products.forEach(product => {
    prodValues = [
      ...prodValues,
      product.sku,
      product.title,
      product.description,
      product.price
    ];

    prodValuesSets.push(
    `(
      $${prodValueIndex++},
      $${prodValueIndex++},
      $${prodValueIndex++},
      $${prodValueIndex++},
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )`
    );
  });

  if (prodValuesSets.length < 1) {
    throw new DBError('No products to create/update');
  }

  queryProd += prodValuesSets.join(', ');
  queryProd += `
    ON CONFLICT (sku)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      price = EXCLUDED.price,
      updated_date = CURRENT_TIMESTAMP at time zone 'utc'
    RETURNING id, sku;
  `;

  console.log('queryProd', queryProd);
  console.log('prodValues', prodValues);

  try {
    await client.connect();
    await client.query('BEGIN');

    const resProduct = await client.query(queryProd, prodValues);
    const updatedProdSKUs = resProduct.rows.map(row => row.sku);
    console.log('updatedProdSKUs', updatedProdSKUs);

    let stockValueIndex = 1;
    let stockValues = [];
    let stockValueSets = [];
    let queryStock = `
      INSERT INTO stock (product_id, count)
      VALUES
    `;

    updatedProdSKUs.forEach(sku => {
      const prodId = resProduct.rows.find(row => row.sku === sku).id;
      const prodCount = products.find(prod => prod.sku === sku).count;

      stockValues = [
        ...stockValues,
        prodId,
        prodCount
      ];

      stockValueSets.push(
      `(
        $${stockValueIndex++},
        $${stockValueIndex++}
      )`
      );
    });

    if (stockValueSets.length < 1) {
      throw new DBError('No products to create/update stock');
    }

    queryStock += stockValueSets.join(', ');
    queryStock += `
      ON CONFLICT (product_id)
      DO UPDATE SET
        count = EXCLUDED.count
      RETURNING product_id;
    `;

    console.log('queryStock', queryStock);
    console.log('stockValues', stockValues);

    await client.query(queryStock, stockValues);

    await client.query('COMMIT');

    return { success: true };
  } catch (e) {
    console.error(e);
    await client.query('ROLLBACK')
    throw new DBError(e.message);
  } finally {
    client.end();
  }
}