import {ProductDto} from './product-dto';

export class ProductAmountDto extends ProductDto {
  totalAmount: number;
  statusCode: String;
  category: String;
  shortDescription: String[];

  constructor(id: number, price: number, title: String, description: String, imageLink: String, totalAmount: number, statusCode: String, shortDescription: String[]) {
    super(id, price, title, description, imageLink);
    this.totalAmount = totalAmount;
    this.statusCode = statusCode;
    this.shortDescription = shortDescription;
  }
}
