import { Component, Input } from '@angular/core';
import { Category } from 'shared/models/category';

@Component({
  selector: 'product-filter-xs-menu',
  templateUrl: './product-filter-xs-menu.component.html',
  styleUrls: ['./product-filter-xs-menu.component.css']
})
export class ProductFilterXsMenuComponent {
  @Input('categories') categories: Category[];
  @Input('selectedCategory') selectedCategory: string;
}
