import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Product } from '../models/product/product';
import { take, map } from "rxjs/operators";
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map(a => new ShoppingCart(a.key, a.payload.val().items))
      );
  }

  private getItemFireObject(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product | ShoppingCartItem) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product | ShoppingCartItem) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product | ShoppingCartItem, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItemFireObject(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: (item.key ? item.payload.val().quantity : 0) + change
        });
      });
  }
}
