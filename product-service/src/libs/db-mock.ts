import { Product } from '@libs/interfaces'
import productList from '@libs/products-mock.json';

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(Array.from(productList));
}