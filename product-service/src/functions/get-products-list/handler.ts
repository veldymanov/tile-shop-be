import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { formatJSONResponse, formatJSONError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@libs/interfaces'
import { getProducts } from '@libs/db-mock';

export const getProductsList = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('getProductsList invokation, event: ', event.path);

    const products: Product[] = await getProducts();

    if (!products) {
      return formatJSONError({ message: 'Products are missing' });
    }

    return formatJSONResponse({ products });
  } catch (error) {
    return formatJSONError({ error });
  }
}

export const main = middyfy(getProductsList);
