export class UserBucketDto {
  productId: number;
  login: String;
  productIdArray: number[]

  constructor(productId: number, login: String, productIdArray: number[]) {
    this.productId = productId;
    this.login = login;
    this.productIdArray = productIdArray;
  }
}
