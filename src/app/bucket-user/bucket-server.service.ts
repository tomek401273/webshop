import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BucketServerService {
  constructor(private httpClient: HttpClient) {
  }

  private userBucketDto = {
    'id': null,
    'login': '',
    'listId': []
  };


  addProductToCard(productId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    this.userBucketDto.id = productId;
    this.userBucketDto.login = localStorage.getItem('login');
    return this.httpClient.put('http://localhost:8080/bucket/add', this.userBucketDto, {
      headers: headers
    });
  }

  addProductListToCard(data: number[]) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    this.userBucketDto.listId = data;
    this.userBucketDto.id = 1;
    console.log(this.userBucketDto);
    this.userBucketDto.login = localStorage.getItem('login');
    return this.httpClient.put('http://localhost:8080/bucket/addList', this.userBucketDto, {
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
