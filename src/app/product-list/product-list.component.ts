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
  private products: ProductData[] = [];
  private pager: any = {};
  private pagedProduct: any[];
  constructor(private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService) {
  }

  ngOnInit() {
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductData) => this.products.splice(this.products.indexOf(product), 1)
    )
    this.showPublicData.getProducts()
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
    this.pagedProduct = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pager.pages);
  }


}
