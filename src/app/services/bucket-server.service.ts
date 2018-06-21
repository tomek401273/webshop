import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBucketDto} from '../model/dto/user-bucket-dto';
import {Server} from '../model/server';

@Injectable()
export class BucketServerService {
  constructor(private httpClient: HttpClient) {
  }

  addProductToCard(productId: number) {
    const userBucketDto: UserBucketDto = new UserBucketDto(productId, null);
    return this.httpClient.post(Server.address + 'bucket/add', userBucketDto);
  }

  removeSingleItemToBucket(productId: number) {
    const idSting = String(productId);
    const params = {productId: idSting};
    return this.httpClient.delete(Server.address + 'bucket/removeSingeItemFromBucket', {
      params: params
    });
  }

  addProductListToCard(data: number[]) {
    const userBucketDto: UserBucketDto = new UserBucketDto(null, data);
    return this.httpClient.put(Server.address + 'bucket/addList', userBucketDto
    );
  }

  removeSingleProductFromBucket(productId: number) {
    const idSting = String(productId);
    const params = {productId: idSting};
    return this.httpClient.delete(Server.address + 'bucket/removeSingleProduct', {
      params: params
    });
  }

  getProductListFromDatabase() {
    return this.httpClient.get(Server.address + 'bucket/getAllProductFromBucket');
  }

  getAddressShippment() {
    return this.httpClient.get(Server.address + 'bucket/addressShipping');
  }

  checkAvailableCoupon(code) {
    const params = {code: code};
    return this.httpClient.get(Server.address + 'bucket/coupon', {
      params: params
    });
  }

  searchCity(country: string, city: string) {
    const params = {countryAlpha2Code: country, city: city};
    return this.httpClient.get(Server.address + 'location/city', {
      params: params
    });
  }

  getAllCountriesOnWorld() {
    return this.httpClient.get(Server.address + 'location/country', {
    });
  }
}
