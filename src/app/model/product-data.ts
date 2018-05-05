export class ProductData {
  private id: number;
  private price: number;
  private title: string;
  private description: string;
  private imageLink: string;


  constructor(id: number, price: number, title: string, description: string, imageLink: string) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.description = description;
    this.imageLink = imageLink;
  }

  toString(): string {
    return 'id: ' + this.id + ' '
      + 'price: ' + this.price + ' '
      + 'title: ' + this.title + ' '
      + 'description: ' + this.description + ' '
      + 'imageLink: ' + this.imageLink + ' ';
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

  get getTitle(): string {
    return this.title;
  }


   title2(): string {
    return 'lubie placki';
  }

  set setTitle(value: string) {
    this.title = value;
  }

  get getDescription(): string {
    return this.description;
  }

  set setDescription(value: string) {
    this.description = value;
  }

  get getImageLink(): string {
    return this.imageLink;
  }

  set setImageLink(value: string) {
    this.imageLink = value;
  }
}
