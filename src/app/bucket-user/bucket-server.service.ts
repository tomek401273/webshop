import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBucketDto} from '../model/dto/user-bucket-dto';

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

    return this.httpClient.post('http://localhost:8080/bucket/add', userBucketDto, {
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

    return this.httpClient.delete('http://localhost:8080/bucket/removeSingeItemFromBucket', {
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

    return this.httpClient.put('http://localhost:8080/bucket/addList', userBucketDto, {
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

    return this.httpClient.delete('http://localhost:8080/bucket/removeSingleProduct', {
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

    return this.httpClient.get('http://localhost:8080/bucket/getAllProductFromBucket', {
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

    return this.httpClient.get('http://localhost:8080/bucket/addressShipping', {
      headers: headers,
      params: params
    });
  }
}
