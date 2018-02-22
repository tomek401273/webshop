import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductData} from '../../product-row/ProductData';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent {
  @ViewChild('f') editProductForm: NgForm;
  productData: ProductData;

  @Input() product: { id: number, price: number, title: string, description: string, imageLink: string };
  @Input() id: number;
  editData = false;
  constructor(private serverServie: ServerService) {
  }

  onShowDetail() {
    this.editData = !this.editData;

  }

  onSubmit() {

    this.productData = new ProductData(this.product.id, this.editProductForm.value.price, this.editProductForm.value.title, this.editProductForm.value.desc, this.editProductForm.value.image);

    let productUpdated = {
      "id": this.product.id,
      "price": this.editProductForm.value.price,
      "title": this.editProductForm.value.title,
      "description": this.editProductForm.value.desc,
      "imageLink": this.editProductForm.value.image
    };


    console.log(this.productData);
    this.serverServie.updateTask(productUpdated)
      .subscribe(
        (response: Response) => {
          console.log(response);
          console.log("next");
          this.serverServie.onTaskUpdated.emit(this.productData);
        },
        (error) => {
          console.log("error");
          console.log(error)
        }
      );
  }

}
