import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse, formatJSONError, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DBError } from '@libs/error-types';
import { Product, ProductDB } from '@libs/interfaces';
import { createDbProduct } from './model';
import { domainToDbData } from './data-mapper';

import schema from './schema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
): Promise<APIGatewayProxyResult> => {
  try {
    const dbProduct: ProductDB = domainToDbData(event.body as Product);
    console.log('dbProduct: ', dbProduct);
    const res = await createDbProduct(dbProduct);
    return formatJSONResponse({ product: res });
  } catch (e) {
    if (e instanceof DBError) {
      return formatJSONError(e);
    } else {
      throw e;
    }
  }
}

export const main = middyfy(createProduct);
