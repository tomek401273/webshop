import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductRowComponent} from './product-row/product-row.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ServerService} from './services/server.service';
import {AddNewProductComponent} from './add-new-product/add-new-product.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { ShowBuketComponent } from './show-buket/show-buket.component';
import { LoggingComponent } from './logging/logging.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {LoggingInterceptor} from "./services/logging.interceptor";
import {LoggingService} from "./services/logging.service";
//import {AuthInterceptor} from "./auth.interceptor";

const appRoutes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'addProduct', component: AddNewProductComponent},
  {path: 'productList', component: ProductListComponent},
  {path: 'productEdit', component: ProductEditComponent},
  {path: 'showBucket', component: ShowBuketComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductRowComponent,
    ProductListComponent,
    AddNewProductComponent,
    ProductEditComponent,
    EditDetailComponent,
    ShowBuketComponent,
    LoggingComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ServerService,
    LoggingService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
