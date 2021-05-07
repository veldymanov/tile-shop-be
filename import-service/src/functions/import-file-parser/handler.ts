import 'source-map-support/register';
import { APIGatewayProxyResult, S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const BUCKET = 'tile-shop-storage';
const REGION = 'eu-west-1';

export const importFileParser = async (event: S3Event): Promise<APIGatewayProxyResult> => {
  const s3 = new AWS.S3({ region: REGION })

  try {
    for (const record of event.Records) {
      console.log('record  ', record);
      const params = {
        Bucket: BUCKET,
        Key: record.s3.object.key
      }
      const s3Stream = s3.getObject(params).createReadStream();
      const results = [];

      s3Stream
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
          console.log('data ', data);
        })
        .on('error', (error) => {
          console.log('error ', error);
        })
        .on('end', ()=> {
          console.log(results);
          console.log('end');
        })

      console.log('Object Key  ', record.s3.object.key);
    }

    return formatJSONResponse({ success: true });
  } catch (e) {
    console.log(e);
    return formatJSONError({ error: e });
  }
}

export const main = middyfy(importFileParser);
