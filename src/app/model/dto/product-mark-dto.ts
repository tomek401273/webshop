export class ProductMarkDto {
  private login: String;
  private productId: number;
  private mark: number;
  private _averageMarks: number;
  private _countMarks: number;

  constructor(login: String, productId: number, mark: number) {
    this.login = login;
    this.productId = productId;
    this.mark = mark;
  }

  get averageMarks(): number {
    return this._averageMarks;
  }

  set averageMarks(value: number) {
    this._averageMarks = value;
  }

  get countMarks(): number {
    return this._countMarks;
  }

  set countMarks(value: number) {
    this._countMarks = value;
  }
}
