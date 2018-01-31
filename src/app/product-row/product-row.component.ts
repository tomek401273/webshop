import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {_throw} from "rxjs/observable/throw";
import {ProductData} from "./ProductData";



@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

productData: ProductData;

  constructor(private http: Http) {}

  ngOnInit() {
  }
  getProduct() {
    // return this.http.get('http://localhost:8080/product/2')
    //   .subscribe(
    //     (response: Response) => {
    //       const data = response.json();
    //       this.productData = new ProductData(data.price, data.title, data.description, data.imageLink);
    //       return data;
    //     },
    //     (error: Response) => {
    //       return 'Something went wrong';
    //     }
    //   )

  }
}
