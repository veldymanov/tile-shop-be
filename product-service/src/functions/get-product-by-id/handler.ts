import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONResponse, formatJSONError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@libs/interfaces'
import { getProducts } from '@libs/db-mock';

const getProductById: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('getProductsList invokation, event: ', event.path);
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
