import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ProductRowComponent} from './product-row/product-row.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ServerService} from "./server.service";
import {AddNewProductComponent} from './add-new-product/add-new-product.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { NavigateComponent } from './navigate/navigate.component';

const appRoutes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'addProduct', component: AddNewProductComponent},
  {path: 'productList', component: ProductListComponent},
  {path: 'productEdit', component: ProductEditComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductRowComponent,
    ProductListComponent,
    AddNewProductComponent,
    ProductEditComponent,
    NavigateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
