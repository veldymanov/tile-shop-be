import 'source-map-support/register';
import AWS from 'aws-sdk';
import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DBError } from '@libs/error-types';
import { Product, ProductDB } from '@libs/interfaces';
import { createDbProducts } from './model';
import { domainToDbData } from './data-mapper';

const REGION = 'eu-west-1';

export const catalogBatchProcess = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
  const sns = new AWS.SNS({ region: REGION });

  try {
    const products: Product[] = event.Records.map(({body}) => JSON.parse(body));
    const dbProducts: ProductDB[] = products.map(product => domainToDbData(product));
    console.log('products ', products);
    console.log('dbProducts ', dbProducts);
    const res = await createDbProducts(dbProducts);
    console.log('res ', res);

    sns.publish({
      Subject: 'Created products',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_PRODUCTS_ARN
    }, (error, data) => {
      if (error) {
        throw error;
      }

      console.log('data ', data);
      return formatJSONResponse(null, 202);
    });
  } catch (e) {
    if (e instanceof DBError) {
      return formatJSONError(e);
    } else {
      throw e;
    }
  }
}

export const main = middyfy(catalogBatchProcess);
