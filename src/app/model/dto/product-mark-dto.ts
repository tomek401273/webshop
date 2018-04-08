export class ProductMarkDto {
  private login: String;
  private productId: number;
  private mark: number;

  constructor(login: String, productId: number, mark: number) {
    this.login = login;
    this.productId = productId;
    this.mark = mark;
  }
}
