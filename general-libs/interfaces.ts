export interface dbObject {
  [key: string]: any;
}
export interface ProductDB {
  id?: string;
  title: string;
  description: string;
  price: number;
  count: number;
  created_date: Date;
  updated_date: Date;
}
export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  count: number;
  createdDate?: Date;
  updatedDate?: Date;
}
