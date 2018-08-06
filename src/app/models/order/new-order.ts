import { Shipping } from "./shipping";
import { ShoppingCart } from "../shopping-cart";
import { OrderItem } from "./order-item";

export class NewOrder {
    userID: string;
    datePlaced: number;
    shipping: Shipping;
    items: OrderItem[];

    constructor(userID: string, shipping: Shipping, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;
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