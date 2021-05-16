import 'source-map-support/register';
import { APIGatewayProxyResult, SNSEvent, SNSHandler, S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'product-service-thumbnails';
const REGION = 'eu-west-1';

export const imageUpload = async (event: S3Event): Promise<APIGatewayProxyResult> => {
  const s3 = new AWS.S3({ region: REGION })

  try {
    for (const record of event.Records) {
      await s3.copyObject({
        Bucket: BUCKET,
        CopySource: BUCKET + '/' + record.s3.object.key,
        Key: record.s3.object.key.replace('images', 'thumbnails')
      }).promise();

      await s3.deleteObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      }).promise();

      console.log('Thumbnail for an image ' + record.s3.object.key.split('/')[1] + 'is created');
    }

    return formatJSONResponse({ success: true });
  } catch (error) {
    return formatJSONError({ error });
  }
}

export const main = middyfy(imageUpload);
