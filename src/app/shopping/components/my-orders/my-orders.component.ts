import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order/order';
import { of as observableOf, Subscription, merge } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css',
    '../../../shared/styles/http-sort-paginate-filter-table.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: MatTableDataSource<Order>;
  displayedColumns: string[] = ['customer', 'date', 'view'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.subscription = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.authService.user$;
        }),
        switchMap(user => this.orderService.getOrdersByUser(user.uid)),
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
      ).subscribe(orders => {
        this.orders = new MatTableDataSource(orders);
        this.orders.sort = this.sort;
        this.orders.paginator = this.paginator;

        /* configure filter */
        this.orders.filterPredicate =
          (data: Order, filter: string) =>
            (data.shipping.name.trim().toLowerCase().indexOf(filter) !== -1 ||
              new Date(data.datePlaced).toLocaleDateString('en-GB').indexOf(filter) !== -1);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // todo implement filter properly
  applyFilter(query: string) {
    this.orders.filter = query.trim().toLowerCase();

    if (this.orders.paginator) {
      this.orders.paginator.firstPage();
    }
  }
}
