import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product/product';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string;
  cart: any;

  productsSubscription: Subscription;
  categoriesSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart())
      .snapshotChanges()
      .pipe(
        map(a => ({
          key: a.key,
          ...a.payload.val()
        }))
      )
      .subscribe(cart => this.cart = cart);


    this.productsSubscription = this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.selectedCategory = params.get('category');

        this.filteredProducts = (this.selectedCategory) ?
          this.products.filter(p => p.category === this.selectedCategory) :
          this.products;
      });

    this.categoriesSubscription = this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}
