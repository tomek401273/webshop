export class UsersLogin {
  private _logins: String[];

  constructor() {
  }

  get logins(): String[] {
    return this._logins;
  }

  set logins(value: String[]) {
    this._logins = value;
  }
}
