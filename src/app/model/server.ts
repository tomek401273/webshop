export class Server {
  // private static _address = 'https://vast-sea-90327.herokuapp.com/';
  // private static _address = 'http://localhost:8080/';
  private static _address = 'http://ec2-18-195-191-45.eu-central-1.compute.amazonaws.com:8080/';

  constructor() {
  }

  static get address(): string {
    return this._address;
  }
}
