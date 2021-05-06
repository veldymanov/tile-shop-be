import { Product, ProductDB } from '@libs/interfaces';
import { snakeToCamelObj } from '@libs/snake-camel';

export const dbToDomainData = (dbProduct: ProductDB): Product => {
  return snakeToCamelObj(dbProduct) as Product;
}
