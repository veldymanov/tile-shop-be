import 'source-map-support/register';
import { APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productList from "./products-mock.json";

const getProductsList: APIGatewayProxyHandler = async (event) => {
  const products = Array.from(productList);
  console.log('getProductsList invokation, event: ', event.resource);

  return formatJSONResponse({
    products
  });
}

export const main = middyfy(getProductsList);
