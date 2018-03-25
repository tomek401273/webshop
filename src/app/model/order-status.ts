export class OrderStatus {
  private login: String;
  private orderId: number;
  private paid: boolean;
  private prepared: boolean;
  private send: boolean;
  private linkDelivery: String;


  constructor(login: String, orderId: number, paid: boolean, prepared: boolean, send: boolean, linkDelivery: String) {
    this.login = login;
    this.orderId = orderId;
    this.paid = paid;
    this.prepared = prepared;
    this.send = send;
    this.linkDelivery = linkDelivery;
  }
}
