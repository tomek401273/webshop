import {Component, OnInit} from '@angular/core';
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";
import {ShowPublicDataSevice} from "./show-public-data.sevice";
import {PagerService} from "../services/pager.service";

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

  private product: ProductData = new ProductData(1, 100, 'Procek', 'wiencyj rdzenióf ', 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg');
  private products: ProductData[] = [];

  private pager: any = {};
  private pagedItems: any[];


  constructor(private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService) {
  }

  ngOnInit() {
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductData) => this.products.splice(this.products.indexOf(this.product), 1)
    )
    this.showPublicData.getProduct()
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.setPage(1);
        },
        (error) => console.log(error)
      );
  }

  setPage(page: number) {
    if (page < 1 || page > this.products.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.products.length, page);
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pager.pages);
  }


}
