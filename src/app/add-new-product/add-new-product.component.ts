import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../services/server.service";
import {ProductData} from "../product-row/ProductData";
import {CanDeactivateGuard} from "../can-deactivate-guard";
import {Observable} from "rxjs/Observable";
import {ProductModel} from "./ProductModel";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') addProductForm: NgForm;
  productData: ProductModel;
  private savedChanges: boolean;

  products = [
    {
      id: 0,
      price: 10000,
      title: 'Procesor',
      description: 'super Procesor',
      imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg',
      amount: 0
    }
  ];


  constructor(private  serverService: ServerService) { }
  lastId: number;
  ngOnInit() {

  }

  onSubmit() {
    console.log('Submitted');
    console.log(this.addProductForm);

    this.lastId = this.products[this.products.length - 1].id;
    console.log(this.lastId);



    this.productData = new ProductModel(this.lastId, this.addProductForm.value.price, this.addProductForm.value.title, this.addProductForm.value.desc, this.addProductForm.value.image, this.addProductForm.value.amount);
    console.log(this.productData);
    this.serverService.addNewProduct(this.productData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.savedChanges = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.addProductForm.value.price !== null || this.addProductForm.value.title !== null || this.addProductForm.value.desc !== null || this.addProductForm.value.image !== null) && !this.savedChanges) {
      return confirm("Do you want to discard the changes ??? ");
    } else {
      return true;
    }

  }


}
