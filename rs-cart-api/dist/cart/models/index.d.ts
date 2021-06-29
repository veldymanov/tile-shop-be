export declare type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
};
export declare type CartItem = {
    product: Product;
    count: number;
};
export declare type Cart = {
    id: string;
    items: CartItem[];
};
