import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product/product';
import { take, map } from "rxjs/operators";
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map(a => new ShoppingCart(a.key, a.payload.val().items))
      );
  }

  async addToCart(product: Product | ShoppingCartItem) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product | ShoppingCartItem) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItemFireObject(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product | ShoppingCartItem, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItemFireObject(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        const quantity = (item.key ? item.payload.val().quantity : 0) + change;
        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      });
  }
}
