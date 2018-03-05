import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ServerService} from './services/server.service';
import {AddNewProductComponent} from './admin-panel/add-new-product/add-new-product.component';
import {FormsModule} from '@angular/forms';
import {ProductEditComponent} from './admin-panel/product-edit/product-edit.component';
import {EditDetailComponent} from './admin-panel/product-edit/edit-detail/edit-detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/interceptoprs/auth.interceptor";
import {LoggingInterceptor} from "./services/interceptoprs/logging.interceptor";
import {LogingService} from "./services/loging.service";
import {HeaderComponent} from './header/header.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {ShowPublicDataSevice} from "./services/show-public-data.sevice";
import {PagerService} from "./services/navigation/pager.service";
import {AppRoutingModule} from "./services/navigation/app-routing.module";
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignupComponent } from './authentication/signup/signup.component';
import {AuthGuard} from "./services/protect/auth-guard.service";
import {CanDeactivateGuard} from "./services/protect/can-deactivate-guard";
import { BucketUserComponent } from './bucket-user/bucket-user.component';
import {BucketService} from "./bucket-user/bucket.service";
import { SummaryComponent } from './bucket-user/summary/summary.component';
import { OrderSuccessfullyComponent } from './bucket-user/summary/order-successfully/order-successfully.component';
import {BucketServerService} from './bucket-user/bucket-server.service';
import {ProductMapper} from "./model/dto/product-mapper";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddNewProductComponent,
    ProductEditComponent,
    EditDetailComponent,
    HeaderComponent,
    SigninComponent,
    AuthenticationComponent,
    SignupComponent,
    BucketUserComponent,
    SummaryComponent,
    OrderSuccessfullyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ServerService,
    ShowPublicDataSevice,
    LogingService,
    BucketServerService,
    PagerService,
    AuthGuard,
    CanDeactivateGuard,
    BucketService,
    ProductMapper,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
