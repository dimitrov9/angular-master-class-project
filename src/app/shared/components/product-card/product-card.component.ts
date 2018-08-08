import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [
    './product-card.component.css',
    '../product-quantity/product-quantity.component.css'
  ]
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('showActions') showActions: boolean;
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  @Input('isImageUrlValid') isImageUrlValid = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
