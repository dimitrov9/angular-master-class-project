import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminModule } from 'admin/admin.module';
import { AngularFireModule, FirebaseOptionsToken } from 'angularfire2';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
