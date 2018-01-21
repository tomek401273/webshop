import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {ProductData} from "../product-row/ProductData";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  @ViewChild('f') addProductForm: NgForm;
  productData: ProductData;

  constructor(private  serverService: ServerService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Submitted");
    console.log(this.addProductForm);
    this.productData = new ProductData(this.addProductForm.value.price,this.addProductForm.value.title,this.addProductForm.value.desc,this.addProductForm.value.image);
    console.log(this.productData);
    this.serverService.addNewProduct(this.productData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
