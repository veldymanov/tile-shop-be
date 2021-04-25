import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { formatJSONResponse, formatJSONError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@libs/interfaces'
import { getProducts } from '@libs/db-mock';

export const getProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('getProductsList invokation, event: ', event.pathParameters);

    const products: Product[] = await getProducts();
    const id = event.pathParameters?.id;
    const product = products.find(product => product.id === id);

    if (!product) {
      return formatJSONError({ message: 'Product is missing' });
    }

    return formatJSONResponse({ product });
  } catch (error) {
    return formatJSONError({ error });
  }
}

export const main = middyfy(getProductById);
