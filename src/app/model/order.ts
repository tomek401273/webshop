import {ProductBought} from './product-bought';
import {ShippingAddress} from './shipping-address';

export class Order {
  private _id: number;
  private _totalValue: number;
  private _totalAmount: number;
  private _boughtDate: number;
  private _userLogin: number;
  private _productBoughts: ProductBought[];
  private _shippingAddressDto: ShippingAddress;
  private _status: String;
  private _linkDelivery: String;
  private _sendDate: String;
  private _deliveryDate: String;
  private _statusCode: String;

  constructor() {
    this.shippingAddressDto = new ShippingAddress();
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

  get status(): String {
    return this._status;
  }

  set status(value: String) {
    this._status = value;
  }


  get linkDelivery(): String {
    return this._linkDelivery;
  }

  set linkDelivery(value: String) {
    this._linkDelivery = value;
  }

  get sendDate(): String {
    return this._sendDate;
  }

  set sendDate(value: String) {
    this._sendDate = value;
  }

  get deliveryDate(): String {
    return this._deliveryDate;
  }

  set deliveryDate(value: String) {
    this._deliveryDate = value;
  }


  get statusCode(): String {
    return this._statusCode;
  }

  set statusCode(value: String) {
    this._statusCode = value;
  }
}

