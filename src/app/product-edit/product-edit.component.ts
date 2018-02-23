import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges,
  OnInit, SimpleChange
} from '@angular/core';
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";
import {ShowPublicDataSevice} from "../product-list/show-public-data.sevice";
import {ProductDataEdit} from "./ProductDataEdit";
import {PagerService} from "../services/pager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {
  private products: ProductData[] = [];
  private productDataEdit: ProductDataEdit[] = [];
  private prdutDataDeleted: ProductData;
  private pager: any = {};
  private pagedProducts: any[];

  constructor(private router: Router,
              private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService) {
  }

  ngAfterContentChecked() {
    console.log("AfterContentChecked");
    this.serverService.onTaskUpdated.subscribe(
      (productUpdated: ProductData) => {
        console.log(productUpdated);
        this.productDataEdit[productUpdated.id - 1] = new ProductDataEdit(productUpdated.id, productUpdated.price, productUpdated.title, productUpdated.description, productUpdated.imageLink, false);
      }
    )
  }

  ngOnInit() {
    // this.serverService.onTaskRemoved.subscribe(
    //   (product222: ProductData) => this.products.splice(this.products.indexOf(product222), 1)
    // );

    this.showPublicData.getProducts()
      .subscribe(
        (procucts: any[]) => {
          this.products = procucts;
          console.log("procuctDataEdit");
          for (let i = 0; i < this.products.length; i++) {
            let product: ProductData = this.products[i];
            this.productDataEdit.push(new ProductDataEdit(product.id, product.price, product.title, product.description, product.imageLink, false));
          }
          this.setPage(1);
        },
        (error) => console.log(error)
      );

  }

  onEditDetail(id: number) {
    this.router.navigate(['/product-edit-detail', id]);
  }

  onRemove(poroductDeteted: ProductDataEdit, id: number) {
    console.log(poroductDeteted);

    let product = {
      "id": poroductDeteted.id,
      "price": poroductDeteted.price,
      "title": poroductDeteted.title,
      "description": poroductDeteted.description,
      "imageLink": poroductDeteted.imageLink
    };
    this.prdutDataDeleted = poroductDeteted;
    this.serverService.removeProduct(product)
      .subscribe(
        (response) => {
          this.serverService.onTaskRemoved.emit(this.prdutDataDeleted);
          this.productDataEdit.splice(id, 1);
        },
        (error) => console.log(error)
      );
  }


  setPage(page: number) {
    if (page < 1 || page > this.products.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.productDataEdit.length, page);
    this.pagedProducts = this.productDataEdit.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pager.pages);
  }


}
