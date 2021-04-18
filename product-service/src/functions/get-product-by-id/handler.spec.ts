import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProductById } from './handler';
import * as dataModule from '@libs/db-mock';
import { Product } from '@libs/interfaces';

const productsMock: Product[] = [
  {
    count: 4,
    description: 'Short Product Description1',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 2.4,
    title: 'ProductOne'
  },
  {
    count: 6,
    description: 'Short Product Description3',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
    price: 10,
    title: 'ProductNew'
  }
];

describe('getProductById', () => {
  let getProductsMock;

  beforeEach(() => {
    getProductsMock = jest.spyOn(dataModule, 'getProducts')
      .mockImplementation(() => Promise.resolve(productsMock));
  });

  afterEach(() => {
    getProductsMock.mockRestore();
  });

  it('should return product by id', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
      }
    } as any;
    const resp: APIGatewayProxyResult = await getProductById(event);
    const product: Product = JSON.parse(resp.body).product;

    expect(getProductsMock).toHaveBeenCalledTimes(1);
    expect(product.id).toBe(event.pathParameters.id);
  });

  it('should return error message', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: 'fake'
      }
    } as any;
    const resp: APIGatewayProxyResult = await getProductById(event);
    const message = JSON.parse(resp.body).message;

    expect(getProductsMock).toHaveBeenCalledTimes(1);
    expect(message).toBe('Product is missing');
  });
});