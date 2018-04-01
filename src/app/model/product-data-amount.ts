import {ProductData} from './product-data';

export class ProductDataAmount extends ProductData {
  private _totalAmount: number;
  private _value: number;
  private _statusCode: string;
  private _statusMessage: string;


  constructor(id: number, price: number, title: string, description: string, imageLink: string, totalAmount: number, statusCode: string, statusMessage: string) {
    super(id, price, title, description, imageLink);
    this._totalAmount = totalAmount;
    this._statusCode = statusCode;
    this._statusMessage = statusMessage;
  }

  get totalAmount() {
    return this._totalAmount;
  }

  set totalAmount(value) {
    this._totalAmount = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }


  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get statusMessage(): string {
    return this._statusMessage;
  }

  set statusMessage(value: string) {
    this._statusMessage = value;
  }
}
