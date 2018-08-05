import { Product } from "./product/product";

export interface ShoppingCartItem {
    key: string;
    product: Product;
    quantity: number;
}