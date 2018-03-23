import {ProductDataAmount} from "./product-data-amount";

export class ProductBought {
  private _product: ProductDataAmount;
  private _amount: number;
  private _totalPrice: number;


  constructor(product: ProductDataAmount, amount: number, totalPrice: number) {
    this._product = product;
    this._amount = amount;
    this._totalPrice = totalPrice;
  }


  get product(): ProductDataAmount {
    return this._product;
  }

  set product(value: ProductDataAmount) {
    this._product = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set totalPrice(value: number) {
    this._totalPrice = value;
  }
}
