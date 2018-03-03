import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ProductData} from '../product-row/ProductData';
import {BucketService} from './bucket.service';
import {BucketProduct} from './bucket-product';
import {Session} from 'selenium-webdriver';
import {isNull, isUndefined} from 'util';
import {Router} from '@angular/router';
import {BucketServerService} from './bucket-server.service';
import {LogingService} from '../auth/loging.service';

@Component({
  selector: 'app-bucket-user',
  templateUrl: './bucket-user.component.html',
  styleUrls: ['./bucket-user.component.css']
})
export class BucketUserComponent implements OnInit, DoCheck {
  private products: BucketProduct[] = [];
  private totalValueProducts: number = 0;
  private totalAmountProducts: number = 0;
  private isAuthenticated = false;


  constructor(private bucketService: BucketService,
              private router: Router,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService) {
  }


  ngOnInit() {
    let bucket = JSON.parse(localStorage.getItem('bucket123'));
    console.log(bucket);
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        let bucketProduct: BucketProduct = new BucketProduct(
          bucket[i]._id,
          bucket[i]._price,
          bucket[i]._title,
          bucket[i]._description,
          bucket[i]._imageLink,
          bucket[i]._amount);
        this.products.push(bucketProduct);
      }
    }
  }

  ngDoCheck() {
    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      let value = prod.price * prod.amount;
      this.products[i].value = value;
      this.calcuateTotalValueProducts();
      this.calculateTotalAmountProduct();

    }

    let bucketToSave = JSON.stringify(this.products);
    // localStorage.clear();
    localStorage.setItem('bucket123', null);
    localStorage.setItem('bucket123', bucketToSave);
    this.isAuthenticated = this.logingServiece.isAuthenticated();

  }

  onRemove(product: BucketProduct) {
    let found = this.products.find(x => x.id === product.id);
    let index = this.products.indexOf(found);
    this.products.splice(index, 1);
  }

  calcuateTotalValueProducts() {
    this.totalValueProducts = 0;
    for (let product of this.products) {
      let valueTemp = Number(product.value) | 0;
      this.totalValueProducts += valueTemp;
    }
  }

  calculateTotalAmountProduct() {
    this.totalAmountProducts = 0;
    for (let prduct of this.products) {
      let amountTemp = Number(prduct.amount) | 0;
      this.totalAmountProducts += amountTemp;
    }
    this.bucketService.bucketStatus.emit(this.totalAmountProducts.toString());
  }

  onNext() {
    this.router.navigate(['/summary']);
  }

  onRemoveAllProducts() {
    this.bucketServerService.removeAllProductFromBucket().subscribe(
      (respone) => {
        console.log('Succesfully rewmoved all products');
        this.products = [];
        localStorage.setItem('bucket123', null);
      },
      (error) => console.log(error)
    );
  }

}
