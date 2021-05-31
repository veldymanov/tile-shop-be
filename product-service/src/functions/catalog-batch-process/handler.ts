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

    if (products.length === 0) {
      throw new TypeError('No products to create/update stock');
    }

    const dbProducts: ProductDB[] = products.map(product => domainToDbData(product));
    console.log('products ', products);
    console.log('dbProducts ', dbProducts);
    const res = await createDbProducts(dbProducts);
    console.log('res ', res);

    for (const product of products) {
      sns.publish({
        Subject: 'Created products',
        Message: JSON.stringify(product),
        TopicArn: process.env.SNS_PRODUCTS_ARN,
      }, (error, res) => {
        if (error) {
          console.log('sns error', error)
        }

        console.log('sns res', res)

      });

      console.log('sns product', product);
    }

    return formatJSONResponse(null, 202)
  } catch (e) {
    if (e instanceof DBError) {
      return formatJSONError(e);
    } else if (e instanceof TypeError) {
      return formatJSONError(e);
    } else {
      throw e;
    }
  }
}

export const main = middyfy(catalogBatchProcess);
