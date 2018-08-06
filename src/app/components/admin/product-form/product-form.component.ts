import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';
import { NewProduct } from '../../../models/product/new-product';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../../models/product/product';
import { MyErrorStateMatcher } from '../../../my-error-state-matcher';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  errorStateMatcher: MyErrorStateMatcher;
  id: string;
  product: Product = {
    key: null,
    title: null,
    price: null,
    category: null,
    imageUrl: null
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.errorStateMatcher = new MyErrorStateMatcher();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id)
        .pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  save(product: NewProduct) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Delete?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
