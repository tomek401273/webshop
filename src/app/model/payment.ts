export class Payment {
  private login: String;
  private orderId: number;
  private isPaid: boolean;


  constructor(login: String, orderId: number, isPaid: boolean) {
    this.login = login;
    this.orderId = orderId;
    this.isPaid = isPaid;
  }
}
