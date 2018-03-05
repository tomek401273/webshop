import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {ProductData} from "../../model/product-data";
import {ShowPublicDataSevice} from "../../services/show-public-data.sevice";
import {PagerService} from "../../services/navigation/pager.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {
  private products: ProductData[] = [];
  private productDataEdit: ProductData[] = [];
  private pager: any = {};
  private pagedProducts: any[];
  private currentPage = 1;
  private redirectedPage = 1;

  constructor(private router: Router,
              private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngAfterContentChecked() {
    this.serverService.onTaskUpdated.subscribe(
      (productUpdated: ProductData) =>
        this.productDataEdit[productUpdated.id - 1] =
          new ProductData(
          productUpdated.id,
          productUpdated.price,
          productUpdated.title,
          productUpdated.description,
          productUpdated.imageLink)
    )
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => this.redirectedPage = params['numberpage'],
        (error) => console.log(error)
      );

    this.showPublicData.getProducts()
      .subscribe(
        (procucts: any[]) => {
          this.products = procucts;
          for (let i = 0; i < this.products.length; i++) {
            let product: ProductData = this.products[i];
            this.productDataEdit.push(new ProductData(
              product.id,
              product.price,
              product.title,
              product.description,
              product.imageLink));
          }
          this.redirectedPage = (typeof this.redirectedPage === 'undefined') ? 1 : this.redirectedPage;
          this.setPage(this.redirectedPage);
        },
        (error) => console.log(error)
      );
  }

  onEditDetail(id: number) {
    this.router.navigate(['/productEdit', id], {queryParams: {numberpage: this.currentPage}});
  }

  onRemove(poroductDeteted: ProductData, id: number) {
    this.serverService.removeProduct(poroductDeteted)
      .subscribe(
        (response) => {
          this.serverService.onTaskRemoved.emit(poroductDeteted);
          this.pagedProducts.splice(id, 1);
        },
        (error) => console.log(error)
      );
  }

  setPage(page: number) {
    this.currentPage = page;
    if (page < 1 || page > this.products.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.productDataEdit.length, page);
    this.pagedProducts = this.productDataEdit.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pager.pages);
  }
}
