import {ProductBought} from "./product-bought";
import {ShippingAddress} from "./shipping-address";

export class Order {
  private _id: number;
  private _totalValue: number;
  private _totalAmount: number;
  private _boughtDate: number;
  private _paid: boolean;
  private _prepared: boolean;
  private _send: boolean;
  private _userLogin: number;
  private _productBoughts: ProductBought[];
  private _shippingAddressDto: ShippingAddress;


  constructor(id: number, totalValue: number, totalAmount: number, boughtDate: number, paid: boolean, prepared: boolean, send: boolean, userLogin: number, productBoughts: ProductBought[], shippingAddressDto: ShippingAddress) {
    this._id = id;
    this._totalValue = totalValue;
    this._totalAmount = totalAmount;
    this._boughtDate = boughtDate;
    this._paid = paid;
    this._prepared = prepared;
    this._send = send;
    this._userLogin = userLogin;
    this._productBoughts = productBoughts;
    this._shippingAddressDto = shippingAddressDto;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  set totalValue(value: number) {
    this._totalValue = value;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }

  get boughtDate(): number {
    return this._boughtDate;
  }

  set boughtDate(value: number) {
    this._boughtDate = value;
  }

  get paid(): boolean {
    return this._paid;
  }

  set paid(value: boolean) {
    this._paid = value;
  }

  get prepared(): boolean {
    return this._prepared;
  }

  set prepared(value: boolean) {
    this._prepared = value;
  }

  get send(): boolean {
    return this._send;
  }

  set send(value: boolean) {
    this._send = value;
  }

  get userLogin(): number {
    return this._userLogin;
  }

  set userLogin(value: number) {
    this._userLogin = value;
  }

  get productBoughts(): ProductBought[] {
    return this._productBoughts;
  }

  set productBoughts(value: ProductBought[]) {
    this._productBoughts = value;
  }

  get shippingAddressDto(): ShippingAddress {
    return this._shippingAddressDto;
  }

  set shippingAddressDto(value: ShippingAddress) {
    this._shippingAddressDto = value;
  }
}

