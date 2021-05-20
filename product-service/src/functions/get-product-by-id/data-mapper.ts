import { Product, ProductDB } from '@general-libs/interfaces';
import { snakeToCamelObj } from '@general-libs/snake-camel';

export const dbToDomainData = (dbProduct: ProductDB): Product => {
  return snakeToCamelObj(dbProduct) as Product;
}
