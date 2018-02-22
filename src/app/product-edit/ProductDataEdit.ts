import {ProductData} from "../product-row/ProductData";

export class ProductDataEdit extends ProductData{
  private _visible: boolean;


  constructor(id: number, price: number, title: string, description: string, imageLink: string, visible: boolean) {
    super(id, price, title, description, imageLink);
    this._visible = visible;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}
