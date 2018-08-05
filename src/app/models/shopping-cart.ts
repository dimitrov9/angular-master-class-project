import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    constructor(
        public key: string,
        public items: { [key: string]: ShoppingCartItem }
    ) { }

    get totalItemsCount() {
        let count = 0;
        Object.keys(this.items).forEach(key => {
            count += this.items[key].quantity;
        })
        return count;
    }
}