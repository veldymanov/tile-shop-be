import { Product, ProductDB } from '@general-libs/interfaces';
import { snakeToCamelObj } from '@general-libs/snake-camel';

export const dbToDomainData = (dbData: ProductDB[]): Product[] => {
  return dbData.map((dbProduct: ProductDB) => snakeToCamelObj(dbProduct) as Product);
}
