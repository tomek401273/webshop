export class ReminderDto {
  productId: number;
  email: string;

  constructor(productId: number, email: string) {
    this.productId = productId;
    this.email = email;
  }
}
