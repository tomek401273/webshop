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

    constructor(private http: HttpClient) {
  }
  private productDto = {
    "id": null,
    "price": null,
    "title": "",
    "description": "",
    "imageLink": ""
  };

  getProduct() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.get('http://localhost:8080/product/all', {
      headers: headers
    })
  }

  addNewProduct(product: ProductData) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    this.productDto.title = product.title;
    this.productDto.description = product.description;
    this.productDto.price = product.price;
    this.productDto.imageLink = product.imageLink;


    console.log(this.productDto);

    return this.http.post('http://localhost:8080/product/save',
      this.productDto, {
      headers: headers
      });
  }

  onTaskRemoved = new EventEmitter<ProductData>();
  onTaskUpdated = new EventEmitter<ProductData>();

  removeProduct(product) {
    console.log(product);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));

    return this.http.put('http://localhost:8080/product/deleteProduct', product, {
      headers: headers
    });
  }

  updateTask(product) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    return this.http.put('http://localhost:8080/product/updateProduct', product,{
        headers: headers
      });
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
