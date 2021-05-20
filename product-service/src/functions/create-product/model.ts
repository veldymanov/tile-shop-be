import { Client } from 'pg';
import { dbOptions } from '@libs/db';
import { DBError } from '@general-libs/error-types';
import { ProductDB } from '@general-libs/interfaces';

export const createDbProduct = async (product: ProductDB): Promise<{success: boolean}> => {
  const client = new Client(dbOptions);

  try {
    await client.connect();
    await client.query('BEGIN');

    const queryProduct = `
      INSERT INTO products (title, description, price, created_date, updated_date)
      VALUES(
        $1, $2, $3,
        CURRENT_TIMESTAMP at time zone 'utc',
        CURRENT_TIMESTAMP at time zone 'utc'
      )
      RETURNING id;
    `;
    const valuesProduct = [product.title, product.description, product.price];
    const resProduct = await client.query(queryProduct, valuesProduct);

    const queryStock = `
      INSERT INTO stock (product_id, count)
      VALUES($1, $2);
    `;
    const valuesStock = [resProduct.rows[0].id, product.count];
    await client.query(queryStock, valuesStock);

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