import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { NewOrder } from '../models/order/new-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order: NewOrder) {
    return this.db.list('/orders').push(order);
  }
}
