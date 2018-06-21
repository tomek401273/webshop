export class OrderStatus {
  private login: String;
  private orderId: number;
  private linkDelivery: String;
  private status: String;

  constructor(login: String, orderId: number, linkDelivery: String, status: String) {
    this.login = login;
    this.orderId = orderId;
    this.linkDelivery = linkDelivery;
    this.status = status;
  }
}
