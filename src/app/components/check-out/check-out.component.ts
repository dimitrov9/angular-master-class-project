import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyErrorStateMatcher } from '../../my-error-state-matcher';
import { Shipping } from '../../models/order/shipping';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Subscription } from '../../../../node_modules/rxjs';
import { NewOrder } from '../../models/order/new-order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: [
    './check-out.component.css',
    '../admin/product-form/product-form.component.css'
  ]
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: Shipping = new Shipping();
  cart: ShoppingCart;
  userID: string;

  errorStateMatcher: MyErrorStateMatcher;

  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();

    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);

    this.userSubscription = this.authService.user$
      .subscribe(user => this.userID = user.uid);
  }

  placeOrder() {
    let newOrder = new NewOrder(this.userID, this.shipping, this.cart);
    this.orderService.storeOrder(newOrder);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
