import {ProductDto} from "./product-dto";
import {ProductData} from "../product-data";
import {ProductDataAmount} from "../product-data-amount";
import {ProductAmountDto} from "./product-amount-dto";

export class ProductMapper {
  mapToProductDto(product: ProductData) {
    let productDto: ProductDto = new ProductDto(
      product.id,
      product.price,
      product.title,
      product.description,
      product.imageLink);
    return productDto;
  }

  mapToProductAmountDto(product: ProductDataAmount) {
    let productAmountDto: ProductAmountDto = new ProductAmountDto(
      product.id,
      product.price,
      product.title,
      product.description,
      product.imageLink,
      product.amount
    );
    return productAmountDto;
  }
}
