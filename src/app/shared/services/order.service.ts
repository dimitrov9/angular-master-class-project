import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NewOrder } from 'shared/models/order/new-order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  getOrders() {
    return this.db.list('/orders')
      .snapshotChanges()
      .pipe(
        map(list => {
          return list.map(a => (
            { key: a.key, ...a.payload.val() }) as Order);
        })
      );
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref =>
      ref.orderByChild('userID').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(list => {
          return list.map(a => (
            { key: a.key, ...a.payload.val() }) as Order);
        })
      );
  }

  async placeOrder(order: NewOrder) {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
