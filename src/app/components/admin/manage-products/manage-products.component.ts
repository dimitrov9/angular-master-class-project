import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product/product';
import { MatPaginator, MatSort, Sort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf, Subscription, of } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  displayedColumns: string[] = ['title', 'price', 'edit'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription;
  dataSource: MatTableDataSource<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.subscription = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productService.getAll();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
