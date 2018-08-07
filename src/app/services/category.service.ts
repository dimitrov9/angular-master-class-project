import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]> {
    return this.db.list('/categories', x => x.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(list => {
          return list.map(a => (
            { key: a.key, ...a.payload.val() }) as Category);
        })
      );
  }
}
