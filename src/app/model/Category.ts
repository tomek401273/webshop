import {ProductDataAmount} from './product-data-amount';

export class Category {
  private _id: number;
  private _name: string;
  private _productDtoList: ProductDataAmount[];

  constructor(id: number, name: string, productDtoList: ProductDataAmount[]) {
    this._id = id;
    this._name = name;
    this._productDtoList = productDtoList;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get productDtoList(): ProductDataAmount[] {
    return this._productDtoList;
  }

  set productDtoList(value: ProductDataAmount[]) {
    this._productDtoList = value;
  }
}
