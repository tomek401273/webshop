export class Comment {
  private _id: number;
  private _login: String;
  private _createdDate: String;
  private _message: String;
  private _productId: number;
  private _editComment: boolean;
  private _changeComment = false;
  private _changeButton = false;

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get login(): String {
    return this._login;
  }

  set login(value: String) {
    this._login = value;
  }

  get message(): String {
    return this._message;
  }

  set message(value: String) {
    this._message = value;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get createdDate(): String {
    return this._createdDate;
  }

  set createdDate(value: String) {
    this._createdDate = value;
  }

  get editComment(): boolean {
    return this._editComment;
  }

  set editComment(value: boolean) {
    this._editComment = value;
  }

  get changeComment(): boolean {
    return this._changeComment;
  }

  set changeComment(value: boolean) {
    this._changeComment = value;
  }


  get changeButton(): boolean {
    return this._changeButton;
  }

  set changeButton(value: boolean) {
    this._changeButton = value;
  }
}
