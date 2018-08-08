import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.authService.appuser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.authService.logout();
  }
}
