import {NgModule} from "@angular/core";
import {ProductEditComponent} from "../../admin-panel/product-edit/product-edit.component";
import {ProductListComponent} from "../../product-list/product-list.component";
import {Routes, RouterModule, CanDeactivate} from "@angular/router";
import {SigninComponent} from "../../authentication/signin/signin.component";
import {AddNewProductComponent} from "../../admin-panel/add-new-product/add-new-product.component";
import {EditDetailComponent} from "../../admin-panel/product-edit/edit-detail/edit-detail.component";
import {SignupComponent} from "../../authentication/signup/signup.component";
import {AuthGuard} from "../protect/auth-guard.service";
import {CanDeactivateGuard} from "../protect/can-deactivate-guard";
import {BucketUserComponent} from "../../bucket-user/bucket-user.component";
import {SummaryComponent} from "../../bucket-user/summary/summary.component";
import {OrderSuccessfullyComponent} from "../../bucket-user/summary/order-successfully/order-successfully.component";

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
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
