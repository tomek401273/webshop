import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../services/server.service';
import {CanDeactivateGuard} from '../../services/protect/can-deactivate-guard';
import {Observable} from 'rxjs/Observable';
import {ProductDataAmount} from '../../model/product-data-amount';
import {Router} from '@angular/router';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') addProductForm: NgForm;
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;
  @ViewChild('discard') discard: SwalComponent;
  productData: ProductDataAmount;
  private savedChanges: boolean;
  categoryNames: string[] = [];
  private discardChanges = false;

  constructor(private  serverService: ServerService,
              private router: Router,
              private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.getCategoryNames();
  }

  onSubmit() {
    this.productData = new ProductDataAmount(
      null,
      this.addProductForm.value.price,
      this.addProductForm.value.title,
      this.addProductForm.value.desc,
      this.addProductForm.value.image,
      this.addProductForm.value.amount,
      this.addProductForm.value.statusCode,
      null);
    this.productData.category = this.addProductForm.value.category;
    this.serverService.addNewProduct(this.productData)
      .subscribe(
        (response: number) => {
          this.success.show();
          // tutaj nie mogą się zdecydować gdzie redirectoać
          // this.router.navigate(['/productEdit'], {queryParams: {lastpage: true}});
          this.router.navigate(['/product/' + response]);
        },
        () => this.error.show()
      );
    this.savedChanges = true;
  }
// nie bardzo wiem jak to zrobić z Sweetalert pewnie jakieś prmisy trzeba zastosować
  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   if ((this.addProductForm.value.price !== null
  //       || this.addProductForm.value.title !== null
  //       || this.addProductForm.value.desc !== null
  //       || this.addProductForm.value.image !== null) && !this.savedChanges) {
  //     return confirm('Do you want to discard the changes ??? ');
  //   } else {
  //     return true;
  //   }
  // }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.discard.show();
    if ((this.addProductForm.value.price !== null
        || this.addProductForm.value.title !== null
        || this.addProductForm.value.desc !== null
        || this.addProductForm.value.image !== null) && !this.savedChanges) {
      return this.discardChanges;
    } else {
      return true;
    }
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this.categoryNames = response;
      },
      () => this.error.show()
    );
  }
}
