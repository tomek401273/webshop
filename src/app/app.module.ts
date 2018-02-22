import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductRowComponent} from './product-row/product-row.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ServerService} from './services/server.service';
import {AddNewProductComponent} from './add-new-product/add-new-product.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { EditDetailComponent } from './product-edit/edit-detail/edit-detail.component';
import { ShowBuketComponent } from './show-buket/show-buket.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {LoggingInterceptor} from "./services/logging.interceptor";
import {LogingService} from "./auth/loging.service";
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import {ShowPublicDataSevice} from "./product-list/show-public-data.sevice";
//import {AuthInterceptor} from "./auth.interceptor";

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'addProduct', component: AddNewProductComponent},
  {path: 'productEdit', component: ProductEditComponent},
  {path: 'showBucket', component: ShowBuketComponent},
  {path: 'login', component: SigninComponent}
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
    HeaderComponent,
    SigninComponent
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
    ShowPublicDataSevice,
    LogingService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
