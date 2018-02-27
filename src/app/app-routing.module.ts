import {NgModule} from "@angular/core";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {Routes, RouterModule, CanDeactivate} from "@angular/router";
import {SigninComponent} from "./auth/signin/signin.component";
import {AddNewProductComponent} from "./add-new-product/add-new-product.component";
import {ShowBuketComponent} from "./show-buket/show-buket.component";
import {EditDetailComponent} from "./product-edit/edit-detail/edit-detail.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {CanDeactivateGuard} from "./can-deactivate-guard";
import {BucketUserComponent} from "./bucket-user/bucket-user.component";
import {SummaryComponent} from "./summary/summary.component";
import {OrderSuccessfullyComponent} from "./order-successfully/order-successfully.component";

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'showBucket', component: ShowBuketComponent},
  {path: 'login', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'bucket', component: BucketUserComponent},
  {path: 'summary',
    component: SummaryComponent},
  {path: 'success', component: OrderSuccessfullyComponent},
  {path: 'addProduct', canActivate: [AuthGuard],
    component: AddNewProductComponent,
  canDeactivate: [CanDeactivateGuard]},
  {path: 'productEdit', canActivate: [AuthGuard], component: ProductEditComponent},
  {path: 'productEdit/:id', canActivate: [AuthGuard],
    component: EditDetailComponent,
    canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
