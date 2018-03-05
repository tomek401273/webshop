import {ProductDto} from "./product-dto";

export class ProductAmountDto extends ProductDto {
  amount: number;

  constructor(id: number, price: number, title: String, description: String, imageLink: String, amount: number) {
    super(id, price, title, description, imageLink);
    this.amount = amount;
  }
}
