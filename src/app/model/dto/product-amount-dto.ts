import {ProductDto} from "./product-dto";

export class ProductAmountDto extends ProductDto {
  totalAmount: number;

  constructor(id: number, price: number, title: String, description: String, imageLink: String, totalAmount: number) {
    super(id, price, title, description, imageLink);
    this.totalAmount = totalAmount;
  }
}
