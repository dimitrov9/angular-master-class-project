import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;

  displayedColumns: string[] = ['image','product', 'quantity', 'price'];

  cartSubscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}