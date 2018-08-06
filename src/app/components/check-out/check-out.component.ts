import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../../my-error-state-matcher';
import { Order } from '../../models/order/order';
import { NewOrder } from '../../models/order/new-order';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: [
    './check-out.component.css',
    '../admin/product-form/product-form.component.css'
  ]
})
export class CheckOutComponent implements OnInit {

  errorStateMatcher: MyErrorStateMatcher;

  constructor() { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
  }

  placeOrder(order: NewOrder) {
    console.log(order);
  }

}
