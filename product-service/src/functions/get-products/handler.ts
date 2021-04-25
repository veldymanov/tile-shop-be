import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { QueryResult } from 'pg';

import { client } from '@libs/db';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product, ProductDB } from '@libs/interfaces'
import { dbToDomainData } from './data-mapper';



export const getProductsList = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('getProducts invokation, event: ', event.path);

    await client.connect();
    const queryRes: QueryResult<ProductDB> = await client.query('SELECT * from products');
    const products: Product[] = dbToDomainData(queryRes.rows);

    if (!products) {
      return formatJSONError({ message: 'Products are missing' });
    }

    return formatJSONResponse({ products });
  } catch (e) {
    console.error(e);
    return formatJSONError({ error: e });
  } finally {
    client.end();
  }
}

export const main = middyfy(getProductsList);
