import {ProductData} from '../product-row/ProductData';

export class BucketData {
  private user: string;
  private productList: [
    {product: ProductData}
    ];


  constructor(user: string, productList: [{ product: ProductData }]) {
    this.user = user;
    this.productList = productList;
  }
}
