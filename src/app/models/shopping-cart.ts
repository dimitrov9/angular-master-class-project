import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(
        public key: string,
        public itemsObject: { [key: string]: ShoppingCartItem }
    ) {
        Object.keys(this.itemsObject).forEach(key => {
            let item = itemsObject[key];
            this.items.push(new ShoppingCartItem(
                key,
                item.product,
                item.quantity
            ));
        });
    }

    get totalItemsCount() {
        let count = 0;
        Object.keys(this.itemsObject).forEach(key => {
            count += this.itemsObject[key].quantity;
        })
        return count;
    }

    get totalPrice() {
        let sum = 0;
        this.items.forEach(item => sum += item.totalPrice);
        return sum;
    }
}