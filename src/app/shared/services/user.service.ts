import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges().pipe(
      map(x => {
        return x as AppUser;
      })
    );
  }
}
