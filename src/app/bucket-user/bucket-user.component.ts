import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {BucketService} from '../services/bucket.service';
import {ProductDataAmount} from '../model/product-data-amount';
import {isNull} from 'util';
import {Router} from '@angular/router';
import {BucketServerService} from '../services/bucket-server.service';
import {LogingService} from '../services/loging.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ServerService} from '../services/server.service';

@Component({
  selector: 'app-bucket-user',
  templateUrl: './bucket-user.component.html',
  styleUrls: ['./bucket-user.component.css']
})
export class BucketUserComponent implements OnInit, DoCheck {
  private _products: ProductDataAmount[] = [];
  private _totalValueProducts = 0;
  private _totalAmountProducts = 0;
  private _isAuthenticated = false;
  private _isCoupon = false;
  private _isFullFiled = false;
  private _wrongCode = false;
  private _correctCode = false;
  private _wrongMessage: String;
  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;
  @ViewChild('info') private _info: SwalComponent;

  constructor(private bucketService: BucketService,
              private router: Router,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService,
              private serverService: ServerService) {
  }

  ngOnInit() {
    localStorage.setItem('coupon', null);
    this._isAuthenticated = this.logingServiece.isAuthenticated();
    if (this._isAuthenticated) {
      this._products = [];
      this.getDataFromDatabase();
      this.saveTempDataToLocalStorage();
    } else {
      const bucket = JSON.parse(localStorage.getItem('bucket123'));
      if (!isNull(bucket)) {
        for (let i = 0; i < bucket.length; i++) {
          const bucketProduct: ProductDataAmount = new ProductDataAmount(
            bucket[i]._id,
            bucket[i]._price,
            bucket[i]._title,
            bucket[i]._description,
            bucket[i]._imageLink,
          );
          bucketProduct.totalAmount = bucket[i]._totalAmount;

          this._products.push(bucketProduct);
        }
        this._isFullFiled = true;
      }
    }

    this.bucketService.buyAllProduct.subscribe(
      () => {
        this._products = [];
        localStorage.setItem('bucket123', null);
      }
    );

    // this.calculateTotalAmountProduct();
    this.calcuateTotalValueProducts();
  }

  ngDoCheck() {
    this._isAuthenticated = this.logingServiece.isAuthenticated();
    for (let i = 0; i < this._products.length; i++) {
      const prod = this._products[i];
      const value = prod.price * prod.totalAmount;
      this._products[i].value = value;
      this.calcuateTotalValueProducts();
      this.calculateTotalAmountProduct();
    }
    this.saveTempDataToLocalStorage();
  }

  saveTempDataToLocalStorage() {
    const bucketToSave = JSON.stringify(this._products);
    localStorage.setItem('bucket123', null);
    localStorage.setItem('bucket123', bucketToSave);
  }

  onAddAmountProcuct(bucketProduct: ProductDataAmount) {
    if (this._isAuthenticated) {
      this.bucketServerService.addProductToCard(bucketProduct.id).subscribe(
        (resposne) => {
          if (resposne === true) {
            this._success.text = 'Successfully increase product items';
            this._success.show();
            this.adding(bucketProduct);
          } else {
            this._error.show();
          }
        }
      );
    } else {
      this.adding(bucketProduct);
    }
    this.calculateTotalAmountProduct();
    this.calcuateTotalValueProducts();
  }

  adding(bucketProduct: ProductDataAmount) {
    const index = this._products.indexOf(this._products.find(x => x.id === bucketProduct.id));
    bucketProduct.totalAmount = bucketProduct.totalAmount + 1;
    this._products[index] = bucketProduct;
  }

  calculateTotalAmountProduct() {
    this._totalAmountProducts = 0;
    for (const prduct of this._products) {
      const amountTemp = Number(prduct.totalAmount) | 0;
      this._totalAmountProducts += amountTemp;
    }
    this.bucketService.bucketStatus.emit(this._totalAmountProducts.toString());
  }

  calcuateTotalValueProducts() {
    this._totalValueProducts = 0;
    for (const product of this._products) {
      const valueTemp = Number(product.value) | 0;
      this._totalValueProducts += valueTemp;
    }
  }

  onSubtractAmountProduct(bucketProduct: ProductDataAmount) {
    if (bucketProduct.totalAmount === 1) {
      this.onRemove(bucketProduct);
    }

    if (bucketProduct.totalAmount > 1) {
      if (this._isAuthenticated) {
        this.bucketServerService.removeSingleItemToBucket(bucketProduct.id).subscribe(
          (resposne) => {
            if (resposne === true) {
              this._success.text = 'Successfully decrease product items';
              this._success.show();
              this.subtracting(bucketProduct);
            } else {
              this._error.show();
            }
          });
      } else {
        this.subtracting(bucketProduct);
      }
    }
    this.calculateTotalAmountProduct();
    this.calcuateTotalValueProducts();
  }

  onRemove(product: ProductDataAmount) {
    if (this._isAuthenticated) {
      this.bucketServerService.removeSingleProductFromBucket(product.id).subscribe(
        () => {
          this._success.text = 'Successfully removed product from bucket';
          this._success.show();
          this.removing(product);
        },
        () => this._error.show()
      );
    } else {
      this.removing(product);
    }
  }

  subtracting(bucketProduct: ProductDataAmount) {
    const index = this._products.indexOf(this._products.find(x => x.id === bucketProduct.id));
    bucketProduct.totalAmount = bucketProduct.totalAmount - 1;
    this._products[index] = bucketProduct;
  }

  removing(product: ProductDataAmount) {
    const found = this._products.find(x => x.id === product.id);
    const index = this._products.indexOf(found);
    this._products.splice(index, 1);
    if (this._products.length === 0) {
      this._isFullFiled = false;
      this._isCoupon = false;
    }
    this.calculateTotalAmountProduct();
    this.calcuateTotalValueProducts();
  }

  onNext() {


    this.bucketServerService.getCountProduct().subscribe(
      (count: number) => {
        if (count === this._totalAmountProducts) {
          this.router.navigate(['/summary']);
        } else {
          this.info.show();
          this.products = [];
          this.getDataFromDatabase();
          this.saveTempDataToLocalStorage();
          this.calculateTotalAmountProduct();
          this.calcuateTotalValueProducts();
        }
      }
    );
  }

  getDataFromDatabase() {
    this.bucketServerService.getProductListFromDatabase().subscribe(
      (products: any[]) => {
        if (!isNull(products)) {
          for (let i = 0; i < products.length; i++) {
            const bucketProduct: ProductDataAmount = new ProductDataAmount(
              products[i].productDto.id,
              products[i].productDto.price,
              products[i].productDto.title,
              products[i].productDto.description,
              products[i].productDto.imageLink,
            );
            bucketProduct.totalAmount = products[i].amount;
            this._products.push(bucketProduct);
          }
          if (this._products.length > 0) {
            this._isFullFiled = true;
          }
        }
      },
      () => this._error.show()
    );
  }

  checkAvailableCode(code) {
    if (this._isFullFiled) {
      this.bucketServerService.checkAvailableCoupon(code.value).subscribe(
        (response: boolean) => {
          if (response) {
            this._isCoupon = true;
            this._correctCode = true;
            this._wrongCode = false;
            localStorage.setItem('coupon', code.value);
          } else {
            this._isCoupon = false;
            this._correctCode = false;
            this._wrongCode = true;
            this._wrongMessage = 'Code error';
          }
        },
        () => this._error.show()
      );
    } else {
      this._wrongCode = true;
      this._correctCode = false;
      this._wrongMessage = 'Fulfill bucket';
    }
  }

  get products(): ProductDataAmount[] {
    return this._products;
  }

  set products(value: ProductDataAmount[]) {
    this._products = value;
  }

  get totalValueProducts(): number {
    return this._totalValueProducts;
  }

  set totalValueProducts(value: number) {
    this._totalValueProducts = value;
  }

  get totalAmountProducts(): number {
    return this._totalAmountProducts;
  }

  set totalAmountProducts(value: number) {
    this._totalAmountProducts = value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get isCoupon(): boolean {
    return this._isCoupon;
  }

  set isCoupon(value: boolean) {
    this._isCoupon = value;
  }

  get isFullFiled(): boolean {
    return this._isFullFiled;
  }

  set isFullFiled(value: boolean) {
    this._isFullFiled = value;
  }

  get wrongCode(): boolean {
    return this._wrongCode;
  }

  set wrongCode(value: boolean) {
    this._wrongCode = value;
  }

  get correctCode(): boolean {
    return this._correctCode;
  }

  set correctCode(value: boolean) {
    this._correctCode = value;
  }

  get wrongMessage(): String {
    return this._wrongMessage;
  }

  set wrongMessage(value: String) {
    this._wrongMessage = value;
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

  get info(): SwalComponent {
    return this._info;
  }

  set info(value: SwalComponent) {
    this._info = value;
  }
}
