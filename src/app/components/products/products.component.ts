import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product/product';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string;

  productsSubscription: Subscription;
  categoriesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
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
  }

}
