import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@libs/interfaces'

import * as productList from "@libs/products-mock.json";

const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList invokation, event: ', event);
  const products: Product[] = Array.from(productList);

  return formatJSONResponse({
    products
  });
}

export const main = middyfy(getProductsList);
