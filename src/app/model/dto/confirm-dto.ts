export class ConfirmDto {
  private _email: string;
  private _confirmCode: string;
  private _discount: boolean;
  private _discountCode: string;

  constructor(email: string, confirmCode: string, discount: boolean, discountCode: string) {
    this._email = email;
    this._confirmCode = confirmCode;
    this._discount = discount;
    this._discountCode = discountCode;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get confirmCode(): string {
    return this._confirmCode;
  }

  set confirmCode(value: string) {
    this._confirmCode = value;
  }

  get discount(): boolean {
    return this._discount;
  }

  set discount(value: boolean) {
    this._discount = value;
  }

  get discountCode(): string {
    return this._discountCode;
  }

  set discountCode(value: string) {
    this._discountCode = value;
  }
}
