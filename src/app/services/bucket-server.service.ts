import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBucketDto} from '../model/dto/user-bucket-dto';
import {Server} from '../model/server';

@Injectable()
export class BucketServerService {
  constructor(private httpClient: HttpClient) {
  }

  addProductToCard(productId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const userBucketDto: UserBucketDto = new UserBucketDto(productId, localStorage.getItem('login'), null);

    return this.httpClient.post(Server.address + 'bucket/add', userBucketDto, {
      headers: headers
    });
  }

  removeSingleItemToBucket(productId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const idSting = String(productId);
    const params = {login: localStorage.getItem('login'), productId: idSting};

    return this.httpClient.delete(Server.address + 'bucket/removeSingeItemFromBucket', {
      headers: headers,
      params: params
    });
  }

  addProductListToCard(data: number[]) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const userBucketDto: UserBucketDto = new UserBucketDto(null, localStorage.getItem('login'), data);

    return this.httpClient.put(Server.address + 'bucket/addList', userBucketDto, {
      headers: headers
    });
  }

  removeSingleProductFromBucket(productId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const idSting = String(productId);
    const params = {login: localStorage.getItem('login'), productId: idSting};

    return this.httpClient.delete(Server.address + 'bucket/removeSingleProduct', {
      headers: headers,
      params: params
    });
  }

  getProductListFromDatabase() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {login: localStorage.getItem('login')};

    return this.httpClient.get(Server.address + 'bucket/getAllProductFromBucket', {
      headers: headers,
      params: params
    });
  }

  getAddressShippment() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {login: localStorage.getItem('login')};

    return this.httpClient.get(Server.address + 'bucket/addressShipping', {
      headers: headers,
      params: params
    });
  }

  checkAvailableCoupon(code) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const params = {code: code};

    return this.httpClient.get(Server.address + 'bucket/coupon', {
      headers: headers,
      params: params
    });
  }

  searchCity(country: string, city: string) {
    // const headers = new HttpHeaders()
    //   .set('Access-Control-Allow-Origin', 'http://gd.geobytes.com')
    // ;
    // const params = {q: city};
    // return this.httpClient.get('http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=PL&q=tor', {
    //   headers: headers,
    // });

    // const headers = new HttpHeaders().set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin')
    //   .append('Access-Control-Allow-Origin', '*')
    //   .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    const params = {countryAlpha2Code: country, city: city};

    return this.httpClient.get(Server.address + 'location/city', {
      headers: headers,
      params: params
    });
  }

  getAllCountriesOnWorld() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.get(Server.address + 'location/country', {
      headers: headers
    });
  }


}
