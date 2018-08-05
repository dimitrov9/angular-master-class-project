import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatListModule,
  MatBadgeModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatBadgeModule
  ]
})
export class MatComponentsModule { }
