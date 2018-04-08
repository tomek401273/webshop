export class CommentDto {
  private id: number;
  private login: String;
  private message: String;
  private productId: number;

  constructor(id: number, login: String, message: String, productId: number) {
    this.id = id;
    this.login = login;
    this.message = message;
    this.productId = productId;
  }
}
