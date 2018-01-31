import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductData} from '../product-row/ProductData';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {
  @ViewChild('f') editProductForm: NgForm;
  productData: ProductData;

  @Input() product: {id: number, price: number, title: string, description: string, imageLink: string};
  @Input() id: number;
  editData= false;
  constructor(private serverServie: ServerService) { }

  ngOnInit() {

  }
  onShowDetail() {
    this.editData = !this.editData;

  }
  onSubmit() {
    console.log(this.editProductForm);
    this.productData = new ProductData(this.product.id, this.editProductForm.value.price, this.editProductForm.value.title, this.editProductForm.value.desc, this.editProductForm.value.image);
    this.serverServie.updateTask(this.productData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
