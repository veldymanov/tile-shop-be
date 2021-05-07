import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'tile-shop-storage';
const PREFIX = 'uploaded';
const REGION = 'eu-west-1';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return formatJSONResponse({
    signedUrl: `https://${BUCKET}.s3-${REGION}.amazonaws.com/${PREFIX}/${event.queryStringParameters.name}`
  });

}

export const main = middyfy(importProductsFile);
