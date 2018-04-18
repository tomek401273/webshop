import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../../services/server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShowPublicDataSevice} from '../../../services/show-public-data.sevice';
import {CanDeactivateGuard} from '../../../services/protect/can-deactivate-guard';
import {Observable} from 'rxjs/Observable';
import {ProductDataAmount} from '../../../model/product-data-amount';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') editProductForm: NgForm;
  private product: ProductDataAmount = new ProductDataAmount(
    null, null, null, null, null, null, null, null);
  private productUpdated: ProductDataAmount;
  private positonProductOnPage = 1;
  private saveChanges = false;
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  constructor(private publicServer: ShowPublicDataSevice,
              private serverServie: ServerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let id: number = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.publicServer.getProduct(id)
      .subscribe(
        (product: any) => {
          this.product = product;
        },
        () => this.error.show());

    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => this.positonProductOnPage = params['numberpage'],
        () => this.error.show());
  }

  onSubmit() {
    this.productUpdated = new ProductDataAmount(
      this.product.id,
      this.editProductForm.value.price,
      this.editProductForm.value.title,
      this.editProductForm.value.desc,
      this.editProductForm.value.image,
      this.editProductForm.value.amount,
      this.editProductForm.value.statusCode,
      null);
    this.serverServie.updateProduct(this.productUpdated)
      .subscribe(
        () => {
          this.success.show();
          this.serverServie.onTaskUpdated.emit(this.productUpdated);
          this.router.navigate(['/productEdit'], {queryParamsHandling: 'preserve'});
        },
        () => this.error.show());
    this.saveChanges = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.editProductForm.value.price !== this.product.price
        || this.editProductForm.value.title !== this.product.title
        || this.editProductForm.value.desc !== this.product.description
        || this.editProductForm.value.image !== this.product.imageLink)
      && !this.saveChanges) {
      return confirm('Do you want to discard the changes ???');
    } else {
      return true;
    }
  }
}
