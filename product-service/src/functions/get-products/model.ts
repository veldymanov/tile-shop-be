import { QueryResult } from 'pg';
import { client } from '@libs/db';
import { DBError } from '@libs/error-types';
import { ProductDB } from '@libs/interfaces';

export const getDbProducts = async (): Promise<ProductDB[]> => {
  try {
    await client.connect();
    const query = `SELECT * FROM products;`;
    const queryRes: QueryResult<ProductDB> = await client.query(query, []);
    return queryRes.rows;
  } catch (e) {
    console.error(e);
    throw new DBError(e.message);
  } finally {
    client.end();
  }
}