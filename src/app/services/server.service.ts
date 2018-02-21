import {EventEmitter, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductData} from '../product-row/ProductData';
import {BucketData} from '../show-buket/BucketData';
import {Log} from "../auth/signin/Log";
import {
  HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams,
  HttpRequest,
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {observable} from "rxjs/symbol/observable";
import {map} from "rxjs/operators";

@Injectable()
export class ServerService {

  private model = {
    "login": "tomek",
    "password": "$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK"

  };

  constructor(private http: HttpClient) {
  }



  getProduct() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.get('http://localhost:8080/product/all', {
     headers: headers
    })
  }

  addNewProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/product/save/',
      product);
  }

  onTaskRemoved = new EventEmitter<ProductData>();

  removeProduct(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/deleteProduct',
      product);
  }

  updateTask(product: ProductData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:8080/product/updateProduct',
      product);
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

  adminLogin() {

  }
}
