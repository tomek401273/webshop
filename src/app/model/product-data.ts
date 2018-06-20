export class ProductData {
  private id: number;
  private price: number;
  private _title: String;
  private _description: String;
  private _imageLink: String;

  constructor(id: number, price: number, title: String, description: String, imageLink: String) {
    this.id = id;
    this.price = price;
    this._title = title;
    this._description = description;
    this._imageLink = imageLink;
  }

  toString(): string {
    return 'id: ' + this.id + ' '
      + 'price: ' + this.price + ' '
      + 'title: ' + this._title + ' '
      + 'description: ' + this._description + ' '
      + 'imageLink: ' + this._imageLink + ' ';
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getPrice(): number {
    return this.price;
  }

  set setPrice(value: number) {
    this.price = value;
  }

  get title(): String {
    return this._title;
  }

  set title(value: String) {
    this._title = value;
  }

  set setTitle(value: String) {
    this._title = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  set setDescription(value: String) {
    this._description = value;
  }

  get imageLink(): String {
    return this._imageLink;
  }

  set imageLink(value: String) {
    this._imageLink = value;
  }

  set setImageLink(value: String) {
    this._imageLink = value;
  }
}
