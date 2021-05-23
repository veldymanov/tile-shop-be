import { Product, ProductDB } from '@libs/interfaces';
import { snakeToCamelObj } from '@libs/snake-camel';

export const dbToDomainData = (dbData: ProductDB[]): Product[] => {
  return dbData.map((dbProduct: ProductDB) => snakeToCamelObj(dbProduct) as Product);
}
