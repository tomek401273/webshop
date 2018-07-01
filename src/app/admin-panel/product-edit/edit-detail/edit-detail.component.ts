import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../../services/server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShowPublicDataSevice} from '../../../services/show-public-data.sevice';
import {CanDeactivateGuard} from '../../../services/protect/can-deactivate-guard';
import {Observable} from 'rxjs/Observable';
import {ProductDataAmount} from '../../../model/product-data-amount';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ProductAmountDto} from '../../../model/dto/product-amount-dto';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') private _editProductForm: NgForm;
  private _product: ProductDataAmount = new ProductDataAmount(null, null, null, null, null);
  private _productUpdated: ProductDataAmount;
  private _positonProductOnPage = 1;
  private _saveChanges = false;
  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;
  @ViewChild('confirmDelete') private _confirmDelete: SwalComponent;
  @ViewChild('successDelete') private _successDelete: SwalComponent;

  constructor(private publicServer: ShowPublicDataSevice,
              private serverServie: ServerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id: number = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.publicServer.getProduct(id)
      .subscribe(
        (product: ProductAmountDto) => {
          this.product.id = product.id;
          this.product.title = product.title;
          this.product.description = product.description;
          this.product.price = product.price;
          this.product.imageLink = product.imageLink;
          this.product.statusCode = product.statusCode;
          this.product.totalAmount = product.totalAmount;

          const descList: String[] = [];
          for (let i = 0; i < product.shortDescription.length; i++) {
            const desc: String = product.shortDescription[i];
            descList.push(desc);
          }
          this.product.shortDescription = descList;
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
      this._editProductForm.value.image
    );
    this._productUpdated.totalAmount = this._editProductForm.value.amount;
    this._productUpdated.statusCode = this._editProductForm.value.statusCode;

    const shortDes: String[] = [];
    shortDes.push(this._editProductForm.value.desc1);
    shortDes.push(this._editProductForm.value.desc2);
    shortDes.push(this._editProductForm.value.desc3);
    shortDes.push(this._editProductForm.value.desc4);
    shortDes.push(this._editProductForm.value.desc5);
    this._productUpdated.shortDescription = shortDes;

    this.serverServie.updateProduct(this._productUpdated)
      .subscribe(
        () => {
          this._success.show();
          this.serverServie.onProductUpdated.emit(this._productUpdated);
          this.router.navigate(['/productEdit'], {queryParamsHandling: 'preserve'});
        },
        () => this._error.show());
    this._saveChanges = true;
  }

  cancelEdit() {
    this.router.navigate(['/productEdit'], {queryParamsHandling: 'preserve'});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this._editProductForm.value.price !== this._product.price
        || this._editProductForm.value.title !== this._product.title
        || this._editProductForm.value.desc !== this._product.description
        || this._editProductForm.value.image !== this._product.imageLink)
      && !this._saveChanges) {
      return confirm('Do you want to discard the changes ?');
    } else {
      return true;
    }
  }

  onDelete() {
    this._confirmDelete.show();
  }

  onConfirm() {
    this.serverServie.removeProduct(this.product.id)
      .subscribe(
        () => {
          this.successDelete.show();
        },
        () => this._error.show()
      );
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

  get confirmDelete(): SwalComponent {
    return this._confirmDelete;
  }

  set confirmDelete(value: SwalComponent) {
    this._confirmDelete = value;
  }

  get successDelete(): SwalComponent {
    return this._successDelete;
  }

  set successDelete(value: SwalComponent) {
    this._successDelete = value;
  }
}
