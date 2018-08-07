import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from '../../models/order/shipping';
import { NewOrder } from '../../models/order/new-order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { MyErrorStateMatcher } from '../../my-error-state-matcher';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: [
    './shipping-form.component.css',
    '../admin/product-form/product-form.component.css'
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
