export class Address {
  private _label: string;
  private _country: string;
  private _state: string;
  private _county: string;
  private _city: string;
  private _district: string;
  private _subdistrict: string;
  private _street: string;
  private _postalCode: string;

  constructor(label: string, country: string, state: string, county: string, city: string, district: string, subdistrict: string, street: string, postalCode: string) {
    this._label = label;
    this._country = country;
    this._state = state;
    this._county = county;
    this._city = city;
    this._district = district;
    this._subdistrict = subdistrict;
    this._street = street;
    this._postalCode = postalCode;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get county(): string {
    return this._county;
  }

  set county(value: string) {
    this._county = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  get subdistrict(): string {
    return this._subdistrict;
  }

  set subdistrict(value: string) {
    this._subdistrict = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }
}
