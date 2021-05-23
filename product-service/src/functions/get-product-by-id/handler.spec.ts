import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProductById } from './handler';
import * as model from './model';
import { Product, ProductDB } from '@libs/interfaces';

const productMock: ProductDB = {
  count: 4,
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 2.4,
  title: 'ProductOne',
  created_date: new Date('01/01/2021'),
  updated_date: new Date('01/01/2021'),
};

describe('getProductById', () => {
  let getProductByIdSpy;

  beforeEach(() => {
    getProductByIdSpy = jest.spyOn(model, 'getDbProductById');
  });

  afterEach(() => {
    getProductByIdSpy.mockRestore();
  });

  it('should return product by id', async () => {
    const getProductMock = getProductByIdSpy.mockImplementation(() => Promise.resolve(productMock));
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
      }
    } as any;
    const resp: APIGatewayProxyResult = await getProductById(event);
    const product: Product = JSON.parse(resp.body).product;

    expect(getProductMock).toHaveBeenCalledTimes(1);
    expect(product.id).toBe(event.pathParameters.id);
  });

  // TODO: refactor
  it('should return error message', async () => {
    const getProductMock = getProductByIdSpy.mockImplementation(() => Promise.resolve(undefined));
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: 'fake'
      }
    } as any;
    const resp: APIGatewayProxyResult = await getProductById(event);
    const message = JSON.parse(resp.body).message;

    expect(getProductMock).toHaveBeenCalledTimes(1);
    expect(message).toBe('Product is missing');
  });
});