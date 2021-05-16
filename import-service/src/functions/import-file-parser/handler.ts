import 'source-map-support/register';
import { APIGatewayProxyResult, S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'tile-shop-storage';
const REGION = 'eu-west-1';

export const importFileParser = async (event: S3Event): Promise<APIGatewayProxyResult> => {
  const s3 = new AWS.S3({ region: REGION, signatureVersion: 'v4' });

  try {
    event.Records.forEach((record) => {
      const params = {
        Bucket: BUCKET,
        Key: record.s3.object.key
      }
      const s3Stream = s3.getObject(params).createReadStream();
      const results = [];

      s3Stream
        .pipe(csv())
        .on('data', (data) => {
          console.log('CSV pasre data chunk ', data);
          results.push(data);
        })
        .on('end', async () => {
          console.log('CVS parse finished. Results: ', results);

          const objUrl = `${BUCKET}/${record.s3.object.key}`;
          console.log(`Copy from ${objUrl}`);

          await s3.copyObject({
            Bucket: BUCKET,
            CopySource: objUrl,
            Key: record.s3.object.key.replace('uploaded', 'parsed')
          }).promise();

          console.log(`Copied from ${objUrl}`);
          console.log(`Delete from ${objUrl}`);

          await s3.deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
          }).promise();

          console.log(`Deleted from ${objUrl}`);
        })
        .on('error', (error) => {
          throw error;
        });
    });

    return formatJSONResponse(null, 202);
  } catch (error) {
    return formatJSONError(error);
  }
}

export const main = middyfy(importFileParser);