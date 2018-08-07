import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product/product";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(
        public key: string,
        private itemsObject: { [key: string]: ShoppingCartItem }
    ) {
        this.itemsObject = itemsObject || {};

        Object.keys(this.itemsObject).forEach(itemKey => {
            this.items.push(new ShoppingCartItem({
                ...itemsObject[itemKey],
                key: itemKey
            }));
        });
    }

    getQuantity(product: Product) {
        const item = this.itemsObject[product.key];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        Object.keys(this.itemsObject).forEach(key => {
            count += this.itemsObject[key].quantity;
        });
        return count;
    }

    get totalPrice() {
        let sum = 0;
        this.items.forEach(item => sum += item.totalPrice);
        return sum;
    }
}
