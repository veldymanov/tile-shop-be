import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product, ProductDB } from '@libs/interfaces'
import { getDbProducts } from './model';
import { dbToDomainData } from './data-mapper';
import { DBError } from '@libs/error-types';

export const getProducts = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('getProducts invokation, event: ', event.path);
    const dbProducts: ProductDB[] = await getDbProducts();

    if (!dbProducts) {
      return formatJSONError(new Error('Products are missing'));
    }

    const products: Product[] = dbToDomainData(dbProducts);
    return formatJSONResponse({ data: products });
  } catch (e) {
    if ( e instanceof DBError) {
      return formatJSONError(e);
    } else {
      throw e;
    }
  }
}

export const main = middyfy(getProducts);
