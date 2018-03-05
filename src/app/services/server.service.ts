import {EventEmitter, Injectable} from "@angular/core";
import {Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductData} from '../model/product-data';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductDataAmount} from "../model/product-data-amount";
import {ProductMapper} from "../model/dto/product-mapper";
import {ProductDto} from "../model/dto/product-dto";
import {ProductAmountDto} from "../model/dto/product-amount-dto";

@Injectable()
export class ServerService {
  private productDto: ProductDto;
  private productAmountDto: ProductAmountDto;

  constructor(private http: HttpClient,
              private mapper: ProductMapper) {
  }

  getProduct() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.get('http://localhost:8080/product/all', {
      headers: headers
    })
  }

  addNewProduct(product: ProductDataAmount) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);

    return this.http.post('http://localhost:8080/product/save',
      this.productAmountDto, {
        headers: headers
      });
  }

  onTaskRemoved = new EventEmitter<ProductData>();
  onTaskUpdated = new EventEmitter<ProductData>();

  removeProduct(product: ProductData) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    this.productDto = this.mapper.mapToProductDto(product);

    return this.http.put('http://localhost:8080/product/deleteProduct', this.productDto, {
      headers: headers
    });
  }

  updateTask(product: ProductDataAmount) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);

    return this.http.put('http://localhost:8080/product/updateProduct', this.productAmountDto, {
      headers: headers
    });
  }
}
