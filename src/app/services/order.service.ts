import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { NewOrder } from '../models/order/new-order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService  
  ) { }

  async placeOrder(order: NewOrder) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
