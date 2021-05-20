import 'source-map-support/register';
import AWS from 'aws-sdk';
import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const REGION = 'eu-west-1';

export const catalogBatchProcess = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
  const sns = new AWS.SNS({ region: REGION });

  try {
    console.log('event', event);
    const products = event.Records.map(({body}) => body);
    console.log(products);

    sns.publish({
      Subject: 'Created products',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN
    }, (error, data) => {
      if (error) {
        throw error;
      }

      console.log('data ', data);
      return formatJSONResponse(null, 202);
    });
  } catch (error) {
    return formatJSONError(error);
  }
}

export const main = middyfy(catalogBatchProcess);
