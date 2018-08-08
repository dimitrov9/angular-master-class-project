import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/orders',
        component: ManageOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: ManageProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  declarations: [
    ManageOrdersComponent,
    ManageProductsComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
