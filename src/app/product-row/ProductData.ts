// export class ProductData {
//   private price: number;
//   private title: string;
//   private description: string;
//   private imageLink: string;
//
//   constructor(price: number, title: string, description: string, imageLink: string) {
//     this.price = price;
//     this.title = title;
//     this.description = description;
//     this.imageLink = imageLink;
//   }
// }
export class ProductData {
  private _id: number;
  private _price: number;
  private _title: string;
  private _description: string;
  private _imageLink: string;


  constructor(id: number, price: number, title: string, description: string, imageLink: string) {
    this._id = id;
    this._price = price;
    this._title = title;
    this._description = description;
    this._imageLink = imageLink;
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

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get imageLink(): string {
    return this._imageLink;
  }

  set imageLink(value: string) {
    this._imageLink = value;
  }
}
