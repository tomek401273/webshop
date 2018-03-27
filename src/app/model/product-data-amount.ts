import {ProductData} from "./product-data";

export class ProductDataAmount extends ProductData {
  private _totalAmount: number;
  private _value: number;

  constructor(id: number, price: number, title: string, description: string, imageLink: string, totalAmount: number) {
    super(id, price, title, description, imageLink);
    this._totalAmount = totalAmount;
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
}
