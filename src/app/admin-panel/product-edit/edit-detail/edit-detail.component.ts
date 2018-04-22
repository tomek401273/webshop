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
  @ViewChild('f') private _editProductForm: NgForm;
  private _product: ProductDataAmount = new ProductDataAmount(
    null, null, null, null, null, null, null, null);
  private _productUpdated: ProductDataAmount;
  private _positonProductOnPage = 1;
  private _saveChanges = false;
  @ViewChild('_success') private _success: SwalComponent;
  @ViewChild('_error') private _error: SwalComponent;

  constructor(private publicServer: ShowPublicDataSevice,
              private serverServie: ServerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  get editProductForm(): NgForm {
    return this._editProductForm;
  }

  set editProductForm(value: NgForm) {
    this._editProductForm = value;
  }

  get product(): ProductDataAmount {
    return this._product;
  }

  set product(value: ProductDataAmount) {
    this._product = value;
  }

  get productUpdated(): ProductDataAmount {
    return this._productUpdated;
  }

  set productUpdated(value: ProductDataAmount) {
    this._productUpdated = value;
  }

  get positonProductOnPage(): number {
    return this._positonProductOnPage;
  }

  set positonProductOnPage(value: number) {
    this._positonProductOnPage = value;
  }

  get saveChanges(): boolean {
    return this._saveChanges;
  }

  set saveChanges(value: boolean) {
    this._saveChanges = value;
  }

  get success(): SwalComponent {
    return this._success;
  }

  set success(value: SwalComponent) {
    this._success = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }

  ngOnInit() {
    let id: number = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.publicServer.getProduct(id)
      .subscribe(
        (product: any) => {
          this._product = product;
        },
        () => this._error.show());

    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => this._positonProductOnPage = params['numberpage'],
        () => this._error.show());
  }

  onSubmit() {
    this._productUpdated = new ProductDataAmount(
      this._product.id,
      this._editProductForm.value.price,
      this._editProductForm.value.title,
      this._editProductForm.value.desc,
      this._editProductForm.value.image,
      this._editProductForm.value.amount,
      this._editProductForm.value.statusCode,
      null);
    this.serverServie.updateProduct(this._productUpdated)
      .subscribe(
        () => {
          this._success.show();
          this.serverServie.onTaskUpdated.emit(this._productUpdated);
          this.router.navigate(['/productEdit'], {queryParamsHandling: 'preserve'});
        },
        () => this._error.show());
    this._saveChanges = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this._editProductForm.value.price !== this._product.price
        || this._editProductForm.value.title !== this._product.title
        || this._editProductForm.value.desc !== this._product.description
        || this._editProductForm.value.image !== this._product.imageLink)
      && !this._saveChanges) {
      return confirm('Do you want to discard the changes ???');
    } else {
      return true;
    }
  }
}
