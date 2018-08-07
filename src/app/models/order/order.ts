import { Shipping } from "./shipping";
import { OrderItem } from "./order-item";

export interface Order {
    key: string;
    userID: string;
    datePlaced: number;
    shipping: Shipping;
    items: OrderItem[];
}
