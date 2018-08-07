import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NewProduct } from '../models/product/new-product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: NewProduct) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(list => {
          return list.map(a => ({
            key: a.key,
            ...a.payload.val()
          } as Product));
        })
      );
  }

  get(productId): Observable<Product> {
    return this.db.object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map(product => ({
          key: product.key,
          ...product.payload.val()
        } as Product))
      );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
