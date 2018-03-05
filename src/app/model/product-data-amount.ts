import {ProductData} from "./product-data";

export class ProductDataAmount extends ProductData {
  private _amount: number;
  private _value: number;

  constructor(id: number, price: number, title: string, description: string, imageLink: string, amount: number) {
    super(id, price, title, description, imageLink);
    this._amount = amount;
  }


  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}
