import { Client, QueryResult } from 'pg';
import { dbOptions } from '@libs/db';
import { DBError } from '@general-libs/error-types';
import { ProductDB } from '@general-libs/interfaces';

export const getDbProductById = async (id: string): Promise<ProductDB> => {
  const client = new Client(dbOptions);

  try {
    await client.connect();
    const query = `
      SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        s.count
      FROM products AS p
      JOIN stock AS s ON s.product_id = p.id
      WHERE p.id = $1;
    `;
    const queryRes: QueryResult<ProductDB> = await client.query(query, [id]);
    return queryRes.rows[0];
  } catch (e) {
    console.error(e);
    throw new DBError(e.message);
  } finally {
    client.end();
  }
}