import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product/product';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;

  cart$: Observable<ShoppingCart>;
  categories$: Observable<Category[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.categories$ = this.categoryService.getAll();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.selectedCategory = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.category === this.selectedCategory) :
      this.products;
  }
}
