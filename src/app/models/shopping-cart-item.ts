import { Product } from "./product/product";

export class ShoppingCartItem {

    constructor(
        public key: string,
        public product: Product,
        public quantity: number
    ) { }

    get totalPrice() {
        return this.quantity * this.product.price;
    }
}