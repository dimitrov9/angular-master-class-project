import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  appUser: AppUser;

  constructor(private authService: AuthService) {
    authService.appuser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.authService.logout();
  }
}
