import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product, ProductDB } from '@libs/interfaces';
import { getDbProductById } from './model';
import { dbToDomainData } from './data-mapper';
import { DBError } from '@libs/error-types';

export const getProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('getProductsList invokation, event: ', event.pathParameters);
    const id = event.pathParameters?.id;
    const dbProduct: ProductDB = await getDbProductById(id);

    if (!dbProduct) {
      return formatJSONError({ message: 'Product is missing' });
    }

    const product: Product = dbToDomainData(dbProduct);
    return formatJSONResponse({ product });
  } catch (e) {
    if ( e instanceof DBError) {
      return formatJSONError({ error: e });
    } else {
      throw e;
    }
  }
}

export const main = middyfy(getProductById);
