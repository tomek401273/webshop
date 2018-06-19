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
  private _search: string;
  private _house: number;
  private _apartment: number;
  private _county: string;
  private _district: string;
  private _state: string;
  private _subdistrict: string;

  constructor() {
    this._login = '';
    this._country = '';
    this._city = '';
    this._postCode = '';
    this._street = '';
    this._name = '';
    this._surname = '';
    this._supplier = '';
    this._code = '';
    this._search = '';
    this._house = 0;
    this._apartment = 0;
    this._county = '';
    this._district = '';
    this._state = '';
    this._subdistrict = '';
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


  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get house(): number {
    return this._house;
  }

  set house(value: number) {
    this._house = value;
  }

  get apartment(): number {
    return this._apartment;
  }

  set apartment(value: number) {
    this._apartment = value;
  }

  get county(): string {
    return this._county;
  }

  set county(value: string) {
    this._county = value;
  }

  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get subdistrict(): string {
    return this._subdistrict;
  }

  set subdistrict(value: string) {
    this._subdistrict = value;
  }
}
