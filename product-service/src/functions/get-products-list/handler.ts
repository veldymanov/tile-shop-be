import 'source-map-support/register';
import { APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productList from "./products-mock.json";

const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList invokation: ', event);

  return formatJSONResponse({
    products: productList
  });
}

export const main = middyfy(getProductsList);
