export class ShippingAddress {
  private _login: string;
  private _country: string;
  private _city: string;
  private _postCode: string;
  private _street: string;
  private _name: string;
  private _surname: string;
  private _supplier: string;
  private _code: string;


  constructor(login: string, country: string, city: string, postCode: string, street: string, name: string, surname: string, supplier: string) {
    this._login = login;
    this._country = country;
    this._city = city;
    this._postCode = postCode;
    this._street = street;
    this._name = name;
    this._surname = surname;
    this._supplier = supplier;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get postCode(): string {
    return this._postCode;
  }

  set postCode(value: string) {
    this._postCode = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get supplier(): string {
    return this._supplier;
  }

  set supplier(value: string) {
    this._supplier = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }
}
