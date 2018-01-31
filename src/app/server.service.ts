import {EventEmitter, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductData} from './product-row/ProductData';
import {BucketData} from './show-buket/BucketData';

@Injectable()
export class ServerService {
  constructor(private http: Http) {
  }

  getProduct() {
    return this.http.get('http://localhost:8080/product/all.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  addNewProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/product/save/',
      product,
      {headers: headers});
  }
  onTaskRemoved = new EventEmitter<ProductData>();

  removeProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/deleteProduct',
      product,
      {headers: headers});
  }
  updateTask(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/updateProduct',
      product,
      {headers: headers});
  }
  getBuckets() {
    return this.http.get('http://localhost:8080/bucket/all.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

}
