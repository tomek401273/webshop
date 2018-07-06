export class Server {
  private static _address = 'http://localhost:8080/';

  constructor() {
  }

  static get address(): string {
    return this._address;
  }
}
