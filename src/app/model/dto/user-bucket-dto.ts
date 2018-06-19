export class UserBucketDto {
  productId: number;
  productIdArray: number[];

  constructor(productId: number, productIdArray: number[]) {
    this.productId = productId;
    this.productIdArray = productIdArray;
  }
}
