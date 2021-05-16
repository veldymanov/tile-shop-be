import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

interface HttpResponse {
  statusCode: number;
  headers: Object;
  body: Object;
};

const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

export const formatJSONResponse = (resp: Object, statusCode: number = 200) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders
    },
    body: JSON.stringify(resp)
  }
}

export const formatJSONError = (err: Error, statusCode: number = 500) => {
  console.log(err.message);

  return {
    statusCode,
    headers: {
      ...defaultHeaders
    },
    body: JSON.stringify({message: JSON.stringify(err.message || 'Something went wrong')})
  }
}
