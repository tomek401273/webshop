export class ProductData {
  private price: number;
  private title: string;
  private description: string;
  private imageLink: string;

  constructor(price: number, title: string, description: string, imageLink: string) {
    this.price = price;
    this.title = title;
    this.description = description;
    this.imageLink = imageLink;
  }
}
