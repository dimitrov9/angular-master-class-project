import { Component, Input } from '@angular/core';
import { Category } from '../../../../models/category';

@Component({
  selector: 'product-filter-sidebar',
  templateUrl: './product-filter-sidebar.component.html',
  styleUrls: ['./product-filter-sidebar.component.css']
})
export class ProductFilterSidebarComponent {
  @Input('categories') categories: Category[];
  @Input('selectedCategory') selectedCategory: string;
}
