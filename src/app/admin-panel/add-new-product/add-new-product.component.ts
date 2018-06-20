import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../services/server.service';
import {CanDeactivateGuard} from '../../services/protect/can-deactivate-guard';
import {Observable} from 'rxjs/Observable';
import {ProductDataAmount} from '../../model/product-data-amount';
import {Router} from '@angular/router';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') private _addProductForm: NgForm;
  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;
  private _productData: ProductDataAmount;
  private _savedChanges: boolean;
  private _categoryNames: string[] = [];
  private _discardChanges = false;

  constructor(private  serverService: ServerService,
              private router: Router,
              private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.getCategoryNames();
  }

  onSubmit() {
    this._productData = new ProductDataAmount(null,
      this._addProductForm.value.price,
      this._addProductForm.value.title,
      this._addProductForm.value.desc,
      this._addProductForm.value.image);
    this._productData.setTotalAmount = this._addProductForm.value.amount;
    this._productData.setStatusCode = this._addProductForm.value.statusCode;
    this._productData.setCategory = this._addProductForm.value.category;

    this._productData.shortDescription.push(this._addProductForm.value.att1);
    this._productData.shortDescription.push(this._addProductForm.value.att2);
    this._productData.shortDescription.push(this._addProductForm.value.att3);
    this._productData.shortDescription.push(this._addProductForm.value.att4);
    this._productData.shortDescription.push(this._addProductForm.value.att5);

    this.serverService.addNewProduct(this._productData)
      .subscribe(
        (response: number) => {
          this._success.show();
          this.router.navigate(['/product/' + response]);
        },
        () => this._error.show()
      );
    this._savedChanges = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.addProductForm.value.price !== null
        || this.addProductForm.value.title !== null
        || this.addProductForm.value.desc !== null
        || this.addProductForm.value.image !== null) && !this.savedChanges) {
      return confirm('Do you want to discard the changes ? ');
    } else {
      return true;
    }
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this._categoryNames = response;
      },
      () => this._error.show()
    );
  }

  get addProductForm(): NgForm {
    return this._addProductForm;
  }

  set addProductForm(value: NgForm) {
    this._addProductForm = value;
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

  get productData(): ProductDataAmount {
    return this._productData;
  }

  set productData(value: ProductDataAmount) {
    this._productData = value;
  }

  get savedChanges(): boolean {
    return this._savedChanges;
  }

  set savedChanges(value: boolean) {
    this._savedChanges = value;
  }

  get categoryNames(): string[] {
    return this._categoryNames;
  }

  set categoryNames(value: string[]) {
    this._categoryNames = value;
  }

  get discardChanges(): boolean {
    return this._discardChanges;
  }

  set discardChanges(value: boolean) {
    this._discardChanges = value;
  }
}
