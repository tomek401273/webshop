import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBucketDto} from "../model/dto/user-bucket-dto";

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

    return this.httpClient.put('http://localhost:8080/bucket/add', userBucketDto, {
      headers: headers
    });
  }

  removeSingleItemToBucket(productId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const userBucketDto: UserBucketDto = new UserBucketDto(productId, localStorage.getItem('login'), null);

    return this.httpClient.put('http://localhost:8080/bucket/removeSingeItemFromBucket', userBucketDto, {
      headers: headers
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
    const userBucketDto: UserBucketDto = new UserBucketDto(productId, localStorage.getItem('login'), null);

    return this.httpClient.put('http://localhost:8080/bucket/removeSingleProduct', userBucketDto, {
      headers: headers
    });
  }

  removeAllProductFromBucket() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.httpClient.put('http://localhost:8080/bucket/removeAllProductFromBucket', localStorage.getItem('login'), {
      headers: headers
    });
  }

  getProductListFromDatabase() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.httpClient.put('http://localhost:8080/bucket/getAllProductFromBucket', localStorage.getItem('login'), {
      headers: headers
    });
  }
}
