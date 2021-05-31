import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'product-service-thumbnails';
const REGION = 'eu-west-1';

export const getThumbnails = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event.path);

  const s3 = new AWS.S3({ region: REGION })
  let thumbnails = [];
  const params = {
    Bucket: BUCKET,
    Prefix: 'thumbnails/'
  };

  try {
    const s3response = await s3.listObjectsV2(params).promise();
    thumbnails = s3response.Contents
      .filter(obj => obj.Size)
      .map(obj => `https://${BUCKET}.s3-${REGION}.amazonaws.com/${obj.Key}`);

    return formatJSONResponse({ thumbnails });
  } catch (e) {
    if ( e instanceof Error) {
      return formatJSONError(e);
    } else {
      throw e;
    }
  }
}

export const main = middyfy(getThumbnails);
