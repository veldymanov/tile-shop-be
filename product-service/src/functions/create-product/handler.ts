import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse, formatJSONError, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DBError } from '@general-libs/error-types';
import { Product, ProductDB } from '@general-libs/interfaces';
import { createDbProduct } from './model';
import { domainToDbData } from './data-mapper';

import schema from './schema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('createProduct invokation, event: ', event.path);
    const dbProduct: ProductDB = domainToDbData(event.body as Product);
    const res = await createDbProduct(dbProduct);
    return formatJSONResponse({ product: res });
  } catch (e) {
    if (e instanceof DBError) {
      return formatJSONError({ error: e });
    } else {
      throw e;
    }
  }
}

export const main = middyfy(createProduct);
