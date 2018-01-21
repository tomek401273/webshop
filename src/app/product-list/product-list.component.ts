import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {ProductData} from "../product-row/ProductData";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  showProduct = false;
  products = [
    {
      price: 10000,
      title: 'Procesor',
      description: 'super Procesor',
      imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg'
    }
  ];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    // this.serverService.onTaskRemoved.subscribe(
    //   (product: ProductData) =>this.products.splice(this.products.indexOf(this.product),1)
    // )
  }
  onGetProducts() {
    this.serverService.getProduct()
      .subscribe(
        (products: any[]) => this.products = products,
        (error) => console.log(error)
      );
  }
  onShowProduct() {
    this.showProduct = !this.showProduct;
  }

}
