import {ProductData} from "../product-row/ProductData";

export class BucketProduct extends ProductData {
  private _amount;
  private _totalPrice;

  constructor(id: number, price: number, title: string, description: string, imageLink: string, amount) {
    super(id, price, title, description, imageLink);
    this._amount = amount;
  }


  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
  }


  get totalPrice() {
    return this._totalPrice;
  }

  set totalPrice(value) {
    this._totalPrice = value;
  }
}
