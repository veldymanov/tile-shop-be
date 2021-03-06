import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProducts } from './handler';
import mockEvent from './mock.json';
import * as model from './model';
import { Product } from '@libs/interfaces';

const productsMock: Product[] = [
  {
    sku: 'qwerty1',
    count: 4,
    description: 'Short Product Description1',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 2.4,
    title: 'ProductOne'
  },
  {
    sku: 'qwerty2',
    count: 6,
    description: 'Short Product Description3',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
    price: 10,
    title: 'ProductNew'
  }
];

describe('getProducts', () => {
  let getProductsSpy;

  beforeEach(() => {
    getProductsSpy = jest.spyOn(model, 'getDbProducts');
  });

  afterEach(() => {
    getProductsSpy.mockRestore();
  });

  it('should return product list', async () => {
    const getProductsMock = getProductsSpy.mockImplementation(() => Promise.resolve(productsMock));
    const event: APIGatewayProxyEvent = mockEvent as any;
    const resp: APIGatewayProxyResult = await getProducts(event);
    const products: Product[] = JSON.parse(resp.body).data;

    expect(getProductsMock).toHaveBeenCalledTimes(1);
    expect(products.length).toBe(productsMock.length);
    expect(products[0].title).toBe(productsMock[0].title);
  });

  // TODO: refactor
  it('should return error message', async () => {
    const getProductsMock = getProductsSpy.mockImplementation(() => Promise.resolve(undefined));
    const event: APIGatewayProxyEvent = mockEvent as any;
    const resp: APIGatewayProxyResult = await getProducts(event);
    const message = JSON.parse(resp.body);

    expect(getProductsMock).toHaveBeenCalledTimes(1);
    expect(message).toBe('Products are missing');
  });
});