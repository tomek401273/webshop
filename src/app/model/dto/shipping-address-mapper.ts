import {ShippingAddress} from '../shipping-address';
import {ShippingAddressDto} from './shipping-address-dto';

export class ShippingAddressMapper {
  mapToShippingAddressDto(shippingAddress: ShippingAddress) {
    const shippingAddressDto: ShippingAddressDto = new ShippingAddressDto(
      shippingAddress.login,
      shippingAddress.country,
      shippingAddress.city,
      shippingAddress.postCode,
      shippingAddress.street,
      shippingAddress.name,
      shippingAddress.surname,
      shippingAddress.supplier,
      shippingAddress.code,
      shippingAddress.search,
      shippingAddress.house,
      shippingAddress.apartment
    );
    return shippingAddressDto;
  }
}
