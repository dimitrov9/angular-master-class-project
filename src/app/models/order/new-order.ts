import { Shipping } from "./shipping";
import { ShoppingCart } from "../shopping-cart";
import { OrderItem } from "./order-item";

export class NewOrder {
    datePlaced: number;
    items: OrderItem[];

    constructor(
        public userID: string,
        public shipping: Shipping,
        cart: ShoppingCart) {

        this.datePlaced = new Date().getTime();
        this.items = cart.items.map(item => {
            return {
                product: {
                    title: item.title,
                    imageUrl: item.imageUrl,
                    price: item.price
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
            }
        });
    }
}