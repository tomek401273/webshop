import {Component, OnInit} from '@angular/core';
import {Log} from '../../model/Log';
import {ServerService} from '../../services/server.service';
import {LogingService} from '../../services/loging.service';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {isNull} from 'util';
import {ProductDataAmount} from '../../model/product-data-amount';
import {BucketServerService} from '../../bucket-user/bucket-server.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  private productIdArray: number[] = [];
  private products: ProductDataAmount[] = [];
  name = 'thomas';
  password = 'thomas';
  message = '';

  constructor(private server: ServerService,
              private loggingService: LogingService,
              private router: Router,
              private bucketServerService: BucketServerService) {
  }

  onSubmit(submittedForm) {
    let log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this.loggingService.getToken(log)
      .subscribe(
        (response: HttpResponse<String>) => {
          let token = response.headers.get('Authorization');
          let role = response.headers.get('Credentials');
          localStorage.setItem('login', submittedForm.value.loginLog);
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          this.getDataFromLocalStorage();
          this.bucketServerService.addProductListToCard(this.productIdArray).subscribe(
            (response2) => {
              console.log('successfully added all product form localStorage to database: '+response2);
            },
            (error) => console.log(error)
          );
          this.productIdArray = [];
          this.getDataFromDatabase();
          this.loggingService.loginSuccessful.emit(role);
          this.router.navigate(['/']);
        },
        (error) => this.somethingGoWrong()
      );
  }

  getDataFromLocalStorage() {
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        for (let j = 0; j < bucket[i]._amount; j++) {
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
          bucket[i]._amount
        );
        console.log(bucketProduct);
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
            let bucketProduct: ProductDataAmount = new ProductDataAmount(
              products[i].id,
              products[i].price,
              products[i].title,
              products[i].description,
              products[i].imageLink,
              products[i].amount
            );
            this.products.push(bucketProduct);
          }
        }
        let datatoLocalStorage = JSON.stringify(this.products);
        localStorage.setItem('bucket123', datatoLocalStorage);
        console.log("data was succes dowloadad from server")
      },
      (error) => console.log(error)
    );
  }
}
