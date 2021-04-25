import { Product, ProductDB } from '@libs/interfaces';
import { camelToSnakeObj } from '@libs/snake-camel';

export const domainToDbData = (product: Product): ProductDB => {
  return  camelToSnakeObj(product) as ProductDB;
}
