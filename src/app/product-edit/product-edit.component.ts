import {Component, OnInit} from '@angular/core';
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editProduct = false;

  showProduct = false;
  products = [
    {
      id: 0,
      price: 10000,
      title: 'Procesor',
      description: 'super Procesor',
      imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg'
    }
  ];

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    // this.serverService.onTaskRemoved.subscribe(
    //   (product222: ProductData) => this.products.splice(this.products.indexOf(product222), 1)
    // );
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
      .subscribe(
        (products: any[]) => this.products = products,
        (error) => console.log(error)
      );

  }

  onEditDetail(i: number) {
    this.editProduct = !this.editProduct;
    console.log('Index procut:' + i);
  }


}
