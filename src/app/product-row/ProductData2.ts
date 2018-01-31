export class ProductData2 {
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
}
