export interface Product {
  id?: string;
  sku: string;
  title: string;
  description: string;
  price: number;
  count: number;
  createdDate?: Date;
  updatedDate?: Date;
}
