import {Component, OnInit} from '@angular/core';
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";
import {ShowPublicDataSevice} from "./show-public-data.sevice";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products = [
  //   {
  //     id: 0,
  //     price: 10000,
  //     title: 'Procesor',
  //     description: 'super Procesor',
  //     imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg'
  //   }
  // ];

  private product: ProductData = new ProductData(1, 100,'Procek', 'wiencyj rdzenióf ','http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg');
  private products: ProductData[] =[];

  constructor(private serverService: ServerService, private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    // this.serverService.onTaskRemoved.subscribe(
    //   (product: ProductData) =>this.products.splice(this.products.indexOf(this.product),1)
    // )
    this.showPublicData.getProduct()
      .subscribe(
        (products: any[]) => this.products = products,
        (error) => console.log(error)
      );
  }
}
