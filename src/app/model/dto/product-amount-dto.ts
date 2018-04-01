import {ProductDto} from './product-dto';

export class ProductAmountDto extends ProductDto {
  totalAmount: number;
  statusCode: string;

  constructor(id: number, price: number, title: String, description: String, imageLink: String, totalAmount: number, statusCode: string) {
    super(id, price, title, description, imageLink);
    this.totalAmount = totalAmount;
    this.statusCode = statusCode;
  }
}
