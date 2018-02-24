import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductData} from '../../product-row/ProductData';
import {ServerService} from '../../services/server.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShowPublicDataSevice} from "../../product-list/show-public-data.sevice";

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {
  @ViewChild('f') editProductForm: NgForm;
  private product: ProductData = new ProductData(null,null,null,null,null);
  private productUpdated: ProductData;
  private positonProductOnPage =1;
  editData = false;

  constructor(private publicServer: ShowPublicDataSevice,
              private serverServie: ServerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.publicServer.getProduct(+this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (product: any) =>{
          console.log(product);
         this.product = product;
        },
        (error) => console.log(error)
      )

    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => {
          this.positonProductOnPage= params['numberpage'];
        },
        (error) => console.log(error)
      );

  }
  onSubmit() {
      this.productUpdated = new ProductData(this.product.id, this.editProductForm.value.price, this.editProductForm.value.title, this.editProductForm.value.desc, this.editProductForm.value.image);

      let productUpdated = {
        "id": this.product.id,
        "price": this.editProductForm.value.price,
        "title": this.editProductForm.value.title,
        "description": this.editProductForm.value.desc,
        "imageLink": this.editProductForm.value.image
      };

      this.serverServie.updateTask(productUpdated)
        .subscribe(
          (response: Response) => {
            this.serverServie.onTaskUpdated.emit(this.productUpdated);
            this.router.navigate(['/productEdit'], {queryParamsHandling: 'preserve'})
          },
          (error) => {
            console.log(error)
          }
        );
  }

}
