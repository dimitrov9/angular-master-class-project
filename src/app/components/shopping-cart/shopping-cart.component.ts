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

  mappedCartItems: ShoppingCartItemForTable[] = [];
  displayedColumns: string[] = ['product', 'quantity', 'price'];

  cartSubscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;

        this.mappedCartItems = cart.items.map(item => ({
          product: item.product.title,
          quantity: item.quantity,
          price: item.totalPrice
        }) as ShoppingCartItemForTable);
      });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}

interface ShoppingCartItemForTable {
  product: string;
  quantity: number;
  price: number;
}