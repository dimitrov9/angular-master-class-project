import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewOrder } from 'shared/models/order/new-order';
import { Shipping } from 'shared/models/order/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { MyErrorStateMatcher } from 'shared/my-error-state-matcher';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: [
    './shipping-form.component.css',
    '../../../shared/styles/form.css'
  ]
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('shoppingCart') shoppingCart: ShoppingCart;
  shipping: Shipping = new Shipping();
  userID: string;

  errorStateMatcher: MyErrorStateMatcher;

  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$
      .subscribe(user => this.userID = user.uid);

    this.errorStateMatcher = new MyErrorStateMatcher();
  }

  async placeOrder() {
    const newOrder = new NewOrder(this.userID, this.shipping, this.shoppingCart);
    const result = await this.orderService.placeOrder(newOrder);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
