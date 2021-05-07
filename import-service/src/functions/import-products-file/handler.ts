import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'tile-shop-storage';
const REGION = 'eu-west-1';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('importProductsFile invokation, event: ', event.pathParameters);

  const s3 = new AWS.S3({ region: REGION })
  let imports = [];
  const params = {
    Bucket: BUCKET,
    Prefix: 'uploaded/'
  };

  try {
    const s3response = await s3.listObjectsV2(params).promise();
    imports = s3response.Contents
      .filter(obj => obj.Size)
      .map(obj => `https://${BUCKET}.s3-${REGION}.amazonaws.com/${obj.Key}`);

    return formatJSONResponse({
      imports,
      fileName: event.pathParameters
    });
  } catch (e) {
    if ( e instanceof Error) {
      return formatJSONError({ error: e });
    } else {
      throw e;
    }
  }
}

export const main = middyfy(importProductsFile);
