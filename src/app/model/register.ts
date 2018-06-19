export class Register {
  private _login: string;
  private _name: string;
  private _surname: string;
  private _password: string;
  private _address: string;
  private _house: number;
  private _apartment: number;

  constructor() {
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
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
}
