import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@libs/interfaces'

import * as productList from "@libs/products-mock.json";

const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList invokation, event: ', event);
  const { id } = event.queryStringParameters;
  const products: Product[] = Array.from(productList);

  return formatJSONResponse({
    product: products.find(product => product.id === id)
  });
}

export const main = middyfy(getProductById);
