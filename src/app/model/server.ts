export class Server {
  // private static _address = 'https://vast-sea-90327.herokuapp.com/';
  private static _address = 'http://localhost:8080/';

  constructor() {
  }

  static get address(): string {
    return this._address;
  }
}
