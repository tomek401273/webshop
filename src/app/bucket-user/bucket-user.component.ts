import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ProductData} from "../product-row/ProductData";
import {BucketService} from "./bucket.service";
import {BucketProduct} from "./bucket-product";
import {Session} from "selenium-webdriver";
import {isNull, isUndefined} from "util";

@Component({
  selector: 'app-bucket-user',
  templateUrl: './bucket-user.component.html',
  styleUrls: ['./bucket-user.component.css']
})
export class BucketUserComponent implements OnInit, DoCheck {
  private products: BucketProduct[] = [];
  private totalValueProducts: number = 0;
  constructor(private bucketService: BucketService) {
  }


  ngOnInit() {
    let bucket = JSON.parse(localStorage.getItem("bucket123"));
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

    }

    let bucketToSave = JSON.stringify(this.products);
   // localStorage.clear();
    localStorage.setItem('bucket123', null);
    localStorage.setItem('bucket123', bucketToSave);
  }

  onRemove(product: BucketProduct) {
    let found = this.products.find(x => x.id === product.id);
    let index = this.products.indexOf(found);
    this.products.splice(index, 1);
  }

  calcuateTotalValueProducts(){
    this.totalValueProducts =0;
    for (let product of this.products){
      let valueTemp =Number(product.value) | 0;
      console.log(valueTemp);
      this.totalValueProducts += valueTemp;

    }
  }

}
