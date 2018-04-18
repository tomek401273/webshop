import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../model/Log';
import {ServerService} from '../../services/server.service';
import {LogingService} from '../../services/loging.service';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {isNull} from 'util';
import {ProductDataAmount} from '../../model/product-data-amount';
import {BucketServerService} from '../../bucket-user/bucket-server.service';
import {TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  private productIdArray: number[] = [];
  private products: ProductDataAmount[] = [];
  modalRef: BsModalRef;
  name = 'tomek371240@gmail.com';
  password = 'thomas';
  message = '';
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  constructor(private server: ServerService,
              private loggingService: LogingService,
              private router: Router,
              private bucketServerService: BucketServerService,
              private modalService: BsModalService) {
  }

  onSubmit(submittedForm) {
    const log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this.loggingService.getToken(log)
      .subscribe(
        (response: HttpResponse<String>) => {
          const token = response.headers.get('Authorization');
          const role = response.headers.get('Credentials');
          localStorage.setItem('login', submittedForm.value.loginLog);
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.getDataFromLocalStorage();

          this.bucketServerService.addProductListToCard(this.productIdArray).subscribe(
            (response2) => {
              this.success.text = 'Your product has succesfully restored';
             this.success.show();
            },
            () => this.error.show()
          );
          this.productIdArray = [];
          this.getDataFromDatabase();
          this.loggingService.loginSuccessful.emit(role);
          this.modalRef.hide();
          // this.router.navigate(['/']);
        },
        () => {
          this.somethingGoWrong();
          this.error.show();
        }
      );
  }

  getDataFromLocalStorage() {
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        for (let j = 0; j < bucket[i]._totalAmount; j++) {
          this.productIdArray.push(bucket[i]._id);
        }
      }
      for (let i = 0; i < bucket.length; i++) {
        let bucketProduct: ProductDataAmount = new ProductDataAmount(
          bucket[i]._id,
          bucket[i]._price,
          bucket[i]._title,
          bucket[i]._description,
          bucket[i]._imageLink,
          bucket[i]._totalAmount,
          null,
          null
        );
        this.products.push(bucketProduct);
      }

    }
  }

  somethingGoWrong() {
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
    this.message = 'something something go wrong ....';
    this.name = '';
    this.password = '';
  }

  getDataFromDatabase() {
    this.bucketServerService.getProductListFromDatabase().subscribe(
      (products: any[]) => {
        if (!isNull(products)) {
          for (let i = 0; i < products.length; i++) {
            const bucketProduct: ProductDataAmount = new ProductDataAmount(
              products[i].productDto.id,
              products[i].productDto.price,
              products[i].productDto.title,
              products[i].productDto.description,
              products[i].productDto.imageLink,
              products[i].amount,
              null,
              null
            );
            this.products.push(bucketProduct);
          }
        }
        let datatoLocalStorage = JSON.stringify(this.products);
        localStorage.setItem('bucket123', datatoLocalStorage);
      },
      () => this.error.show()
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
