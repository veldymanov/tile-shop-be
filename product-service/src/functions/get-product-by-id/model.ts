import { QueryResult } from 'pg';
import { client } from '@libs/db';
import { DBError } from '@libs/error-types';
import { ProductDB } from '@libs/interfaces';

export const getDbProductById = async (id: string): Promise<ProductDB> => {
  try {
    await client.connect();

    const query = `
      SELECT * FROM products
      WHERE id = $1;
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