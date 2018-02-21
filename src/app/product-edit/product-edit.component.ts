import {Component, OnInit} from '@angular/core';
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";
import {ShowPublicDataSevice} from "../product-list/show-public-data.sevice";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editProduct = false;
  private products: ProductData[] =[];

  constructor(
    private serverService: ServerService,
    private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    // this.serverService.onTaskRemoved.subscribe(
    //   (product222: ProductData) => this.products.splice(this.products.indexOf(product222), 1)
    // );

    this.showPublicData.getProduct()
      .subscribe(
        (procucts: any[]) => this.products= procucts,
        (error) => console.log(error)
      );
  }


  onRemove(id: number) {
    // console.log(id);
    // console.log(this.products[id]);
    // const productData: ProductData = this.products[id];
    // this.serverService.removeProduct(productData)
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => console.log(error)
    //   );

    this.serverService.getProduct()
      // .subscribe(
      //   (products: any[]) => this.products = products,
      //   (error) => console.log(error)
      // );

  }

  onEditDetail(i: number) {
    this.editProduct = !this.editProduct;
    console.log('Index procut:' + i);
  }



}
