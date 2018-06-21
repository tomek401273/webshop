export class ProductData {
  private _id: number;
  private _price: number;
  private _title: String;
  private _description: String;
  private _imageLink: String;

  constructor(id: number, price: number, title: String, description: String, imageLink: String) {
    this._id = id;
    this._price = price;
    this._title = title;
    this._description = description;
    this._imageLink = imageLink;
  }

  toString(): string {
    return 'id: ' + this._id + ' '
      + 'price: ' + this._price + ' '
      + 'title: ' + this._title + ' '
      + 'description: ' + this._description + ' '
      + 'imageLink: ' + this._imageLink + ' ';
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get title(): String {
    return this._title;
  }

  set title(value: String) {
    this._title = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get imageLink(): String {
    return this._imageLink;
  }

  set imageLink(value: String) {
    this._imageLink = value;
  }
}
