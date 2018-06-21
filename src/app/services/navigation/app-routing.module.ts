import {NgModule} from '@angular/core';
import {ProductEditComponent} from '../../admin-panel/product-edit/product-edit.component';
import {ProductListComponent} from '../../product-list/product-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AddNewProductComponent} from '../../admin-panel/add-new-product/add-new-product.component';
import {EditDetailComponent} from '../../admin-panel/product-edit/edit-detail/edit-detail.component';
import {SignupComponent} from '../../authentication/signup/signup.component';
import {AuthGuard} from '../protect/auth-guard.service';
import {CanDeactivateGuard} from '../protect/can-deactivate-guard';
import {BucketUserComponent} from '../../bucket-user/bucket-user.component';
import {SummaryComponent} from '../../bucket-user/summary/summary.component';
import {OrderSuccessfullyComponent} from '../../bucket-user/summary/order-successfully/order-successfully.component';
import {OrdersComponent} from '../../orders/orders.component';
import {OrderDetailComponent} from '../../orders/order-detail/order-detail.component';
import {OrdersAdminComponent} from '../../orders/orders-admin/orders-admin.component';
import {OrderAdminDetailComponent} from '../../orders/orders-admin/order-admin-detail/order-admin-detail.component';
import {ProductComponent} from '../../product-list/product/product.component';
import {ConfirmNewsletterComponent} from '../../authentication/confirm-newsletter/confirm-newsletter.component';
import {ConfirmAccountComponent} from '../../authentication/confirm-account/confirm-account.component';
import {UserDataComponent} from '../../user-data/user-data.component';
import {ChangePasswordComponent} from '../../user-data/change-password/change-password.component';

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'bucket', component: BucketUserComponent},
  {path: 'summary', canActivate: [AuthGuard], component: SummaryComponent},
  {path: 'success/:id', canActivate: [AuthGuard], component: OrderSuccessfullyComponent},
  {path: 'orders', canActivate: [AuthGuard], component: OrdersComponent},
  {path: 'orders/:id', canActivate: [AuthGuard], component: OrderDetailComponent},
  {path: 'admin-orders', canActivate: [AuthGuard], component: OrdersAdminComponent},
  {path: 'newsletter/confirm', component: ConfirmNewsletterComponent},
  {path: 'admin-orders/:id', canActivate: [AuthGuard], component: OrderAdminDetailComponent},
  {path: 'confirm-account', component: ConfirmAccountComponent},
  {path: 'user-data', canActivate: [AuthGuard], component: UserDataComponent},
  {path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent},
  {
    path: 'addProduct', canActivate: [AuthGuard],
    component: AddNewProductComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {path: 'productEdit', canActivate: [AuthGuard], component: ProductEditComponent},
  {
    path: 'productEdit/:id', canActivate: [AuthGuard],
    component: EditDetailComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
