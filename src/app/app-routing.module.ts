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

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'addProduct', component: AddNewProductComponent},
  {path: 'productEdit', canActivate: [AuthGuard], component: ProductEditComponent},
  {path: 'product-edit-detail/:id', component: EditDetailComponent},
  {path: 'showBucket', component: ShowBuketComponent},
  {path: 'login', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
imports: [
  RouterModule.forRoot(appRoutes)
],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
