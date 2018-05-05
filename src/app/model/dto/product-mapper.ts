import {ProductDto} from './product-dto';
import {ProductData} from '../product-data';
import {ProductDataAmount} from '../product-data-amount';
import {ProductAmountDto} from './product-amount-dto';

export class ProductMapper {
  mapToProductDto(product: ProductData) {
    const productDto: ProductDto = new ProductDto(
      product.getId,
      product.getPrice,
      product.getTitle,
      product.getDescription,
      product.getImageLink);
    return productDto;
  }

  mapToProductAmountDto(product: ProductDataAmount) {
    const productAmountDto: ProductAmountDto = new ProductAmountDto(
      product.getId,
      product.getPrice,
      product.getTitle,
      product.getDescription,
      product.getImageLink,
      product.getTotalAmount,
      product.getStatusCode
    );
    productAmountDto.category = product.getCategory;
    return productAmountDto;
  }
}
