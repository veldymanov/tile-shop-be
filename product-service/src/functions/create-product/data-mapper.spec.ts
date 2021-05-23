import { CamelObjectError } from '@libs/error-types';
import { Product, ProductDB } from '@libs/interfaces';
import { domainToDbData } from './data-mapper';

const dbProduct: ProductDB = {
  sku: 'qwerty1',
  count: 4,
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 2.4,
  title: 'ProductOne',
  created_date: new Date('01/01/2020'),
  updated_date: new Date('01/01/2020')
};

const product: Product = {
  sku: 'qwerty1',
  count: 4,
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 2.4,
  title: 'ProductOne',
  createdDate: new Date('01/01/2020'),
  updatedDate: new Date('01/01/2020')
};

describe('domainToDbData', () => {
  it('should map db data to domain data', () => {
    const result = domainToDbData(product);
    expect(result).toEqual(dbProduct);
  });

  it('should throw CamelObjectError', () => {
    expect(() => domainToDbData([[]] as any)).toThrow(CamelObjectError);
    expect(() => domainToDbData([[]] as any)).toThrow('Wrong Camel Object property names');
  })
});