export class ProductModel {
  id: number;
  price: number;
  title: string;
  description: string;
  imageLink: string;
  amount: number;


  constructor(id: number, price: number, title: string, description: string, imageLink: string, amount: number) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.description = description;
    this.imageLink = imageLink;
    this.amount = amount;
  }
}
