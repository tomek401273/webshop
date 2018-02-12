import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  @ViewChild('f') addProductForm: NgForm;
  productData: ProductData;

  products = [
    {
      id: 0,
      price: 10000,
      title: 'Procesor',
      description: 'super Procesor',
      imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg'
    }
  ];


  constructor(private  serverService: ServerService) { }
  lastId: number;
  ngOnInit() {

  }

  onSubmit() {
    console.log('Submitted');
    console.log(this.addProductForm);

    this.onGetProducts();
    this.lastId = this.products[this.products.length - 1].id;
    //this.lastId= this.lastId + 1;
    console.log(this.lastId);



    this.productData = new ProductData(this.lastId, this.addProductForm.value.price, this.addProductForm.value.title, this.addProductForm.value.desc, this.addProductForm.value.image);
    console.log(this.productData);
    this.serverService.addNewProduct(this.productData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }


  onGetProducts() {
    this.serverService.getProduct()
      .subscribe(
        (products: any[]) => this.products = products,
        (error) => console.log(error)
      );
    console.log(this.products);
  }

}
