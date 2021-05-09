import 'source-map-support/register';
import AWS from 'aws-sdk';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'tile-shop-storage';
const CATALOG_PATH = 'uploaded';
const REGION = 'eu-west-1';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const s3 = new AWS.S3({ region: REGION });

  try {
    const prefix = CATALOG_PATH + '/' + event.queryStringParameters.name;
    const params = {
      Bucket: BUCKET,
      Key: prefix,
      Expires: 60,
      ContentType: 'text/csv'
    };

    const url = await s3.getSignedUrlPromise('putObject', params);

    return formatJSONResponse({ url });
  } catch (error) {
    return formatJSONError({ error });
  }
}

export const main = middyfy(importProductsFile);
