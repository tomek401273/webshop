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
  private productRecived: BucketProduct[] =[];
  private totalValueProducts: number = 0;
  constructor(private bucketService: BucketService) {
  }


  ngOnInit() {
    let bucket = JSON.parse(localStorage.getItem("bucket"));
    console.log(bucket);
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
    // this.products = this.products.concat(this.bucketService.getProducts());
    this.productRecived = this.bucketService.getProducts();
    for(let i =0; i< this.productRecived.length; i++){
      let recievedProduct = this.productRecived[i];
      this.addProductToBucket(recievedProduct)
    }




  }

  addProductToBucket(product: BucketProduct) {
    let founded: BucketProduct = this.products.find(x => x.id === product.id)

    if (isUndefined(founded)) {
      console.log("In this bucket NOT exit already this product");
      this.products.push(new BucketProduct(product.id, product.price, product.title, product.description, product.imageLink, product.amount));
    } else {
      let index = this.products.indexOf(founded);
      let amount = founded.amount;
      amount++;
      founded.amount = amount;
      this.products[index] = founded;
      console.log("In bucktet exit this prodcucts");
      console.log(this.products[index]);
      // this.products[index] =founded;
    }
  }

  ngDoCheck() {
    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      let value = prod.price * prod.amount;
      this.products[i].value = value;
      //console.log(totalPrice);
      for (let product of this.products){
        console.log(product)
        this.totalValueProducts += product.value;

      }
    }

    let bucketToSave = JSON.stringify(this.products);
    localStorage.setItem('bucket', bucketToSave);
    this.bucketService.cleanUpBucketTemp();

  }

  onRemove(product: BucketProduct) {
    let found = this.products.find(x => x.id === product.id);
    let index = this.products.indexOf(found);
    this.products.splice(index, 1);
  }

  calcuateTotalValueProducts(){
    for (let product of this.products){
      this.totalValueProducts += product.value;

    }
  }

}
