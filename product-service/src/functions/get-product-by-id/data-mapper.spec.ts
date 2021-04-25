import { SnakeObjectError } from '@libs/error-types';
import { Product, ProductDB } from '@libs/interfaces';
import { dbToDomainData } from './data-mapper';

const dbProducts: ProductDB = {
  count: 4,
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 2.4,
  title: 'ProductOne',
  created_date: new Date('01/01/2020'),
  updated_date: new Date('01/01/2020')
};

const products: Product = {
  count: 4,
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 2.4,
  title: 'ProductOne',
  createdDate: new Date('01/01/2020'),
  updatedDate: new Date('01/01/2020')
};

describe('dbToDomainData', () => {
  it('should map db data to domain data', () => {
    const result = dbToDomainData(dbProducts);
    expect(result).toEqual(products);
  });

  it('should throw SnakeObjectError', () => {
    expect(() => dbToDomainData([[]] as any)).toThrow(SnakeObjectError);
    expect(() => dbToDomainData([[]] as any)).toThrow('Wrong Snake Object property names');
  })
});