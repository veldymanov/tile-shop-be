import { Product, ProductDB } from '@general-libs/interfaces';
import { camelToSnakeObj } from '@general-libs/snake-camel';

export const domainToDbData = (product: Product): ProductDB => {
  return  camelToSnakeObj(product) as ProductDB;
}
