import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>

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
