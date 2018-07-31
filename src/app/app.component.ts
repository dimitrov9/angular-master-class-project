import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '../../node_modules/@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    userService: UserService,
    authService: AuthService,
    router: Router) {
    authService.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
