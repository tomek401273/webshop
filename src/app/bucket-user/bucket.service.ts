import {ProductData} from "../product-row/ProductData";
import {EventEmitter} from "@angular/core";
import {BucketProduct} from "./bucket-product";
import {isUndefined} from "util";

export class BucketService {
  // private productsInBucket: ProductData[] = [];
  // private products = new Map();
  private products: BucketProduct[] = [];

  addProductToBucket(product: ProductData) {
    let founded: BucketProduct = this.products.find(x => x.id === product.id)

    if (isUndefined(founded)) {
      console.log("In this bucket NOT exit already this product");
      this.products.push(new BucketProduct(product.id, product.price, product.title, product.description, product.imageLink, 1));
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


  // addProdutToBucket = new EventEmitter<ProductData>();

  // addProdutctToBucket(product: ProductData) {
  //
  //   if (this.products.get(product) == null) {
  //     console.log("product amount is not existi in map");
  //     console.log(product);
  //     this.products.set(product, 1);
  //   } else {
  //     let amout = this.products.get(product);
  //     console.log("product exist in database in amount: "+amout)
  //     console.log(product);
  //     amout++;
  //     this.products.set(product, amout);
  //   }
  // }


  // removeProduct(product: ProductData) {
  //
  // }
  //
  // findProductInBucket(product: ProductData) {
  //   let foundedProduct: ProductData = this.productsInBucket.find(x => x.id == product.id);
  //   console.log(foundedProduct);
  // }

  // getProducts() {
  //   return this.productsInBucket;
  // }

  getProducts() {
    return this.products;
  }

  cleanUpBucketTemp() {
    this.products =[];
  }
}
