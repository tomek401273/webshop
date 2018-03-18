export class ProductDto {
  id: number;
  price: number;
  title: String;
  description: String;
  imageLink: String;
  totalAmount: number

  constructor(id: number, price: number, title: String, description: String, imageLink: String) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.description = description;
    this.imageLink = imageLink;
  }
}
