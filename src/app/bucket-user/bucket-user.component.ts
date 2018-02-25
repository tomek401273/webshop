import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ProductData} from "../product-row/ProductData";
import {BucketService} from "./bucket.service";
import {BucketProduct} from "./bucket-product";
import {Session} from "selenium-webdriver";
import {isNull} from "util";

@Component({
  selector: 'app-bucket-user',
  templateUrl: './bucket-user.component.html',
  styleUrls: ['./bucket-user.component.css']
})
export class BucketUserComponent implements OnInit, DoCheck, OnDestroy {
  private products: BucketProduct[] = [];

  constructor(private bucketService: BucketService) {
  }


  ngOnInit() {
    let bucket = JSON.parse(localStorage.getItem("bucket"));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        console.log(bucket[i]);
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
    this.products = this.products.concat(this.bucketService.getProducts());


  }


  ngDoCheck() {
    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      let totalPrice = prod.price * prod.amount;
      this.products[i].totalPrice = totalPrice;
      //console.log(totalPrice);

    }
  }

  onRemove(product: BucketProduct) {
    let found =this.products.find(x => x.id === product.id);
    let index = this.products.indexOf(found);
    this.products.splice(index,1);
  }

  ngOnDestroy() {
    let bucketToSave = JSON.stringify(this.products);
    localStorage.setItem('bucket', bucketToSave);
    this.bucketService.cleanUpBucketTemp();
  }
}
