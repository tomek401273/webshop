import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Log} from './Log';
import {ServerService} from '../../services/server.service';
import {LogingService} from '../loging.service';
import {NgForm} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {isNull} from 'util';
import {BucketProduct} from '../../bucket-user/bucket-product';
import {BucketServerService} from '../../bucket-user/bucket-server.service';
import {ProductData} from '../../product-row/ProductData';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private productIdArray: number[] = [];
  private products: BucketProduct[] = [];
  name = 'thomas';
  password = 'thomas';
  message = '';

  constructor(private server: ServerService,
              private loggingService: LogingService,
              private router: Router,
              private bucketServerService: BucketServerService) {
  }

  ngOnInit() {
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
          this.loggingService.loginSuccessful.emit(role);
          this.router.navigate(['/']);
          this.getDataFromLocalStorage();
          this.bucketServerService.addProductListToCard(this.productIdArray).subscribe(
            (response2) => {
              console.log('succesfullyy adde all product form localStorage to databae');
              console.log(response2);
            },
            (error) => console.log(error)
          );

          localStorage.setItem('bucket123', null);
          this.productIdArray = [];
          this.getDataFromDatabase();


        },
        (error) => {
          localStorage.setItem('token', null);
          localStorage.setItem('role', null);
          this.somethingGoWrong();
        }
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
    }
  }

// d

  somethingGoWrong() {
    this.message = 'something something go wrong ....';
    this.name = '';
    this.password = '';
  }

  getDataFromDatabase() {
    this.bucketServerService.getProductListFromDatabase().subscribe(
      (products: any[]) => {
        if (!isNull(products)) {
          for (let i = 0; i < products.length; i++) {
            let bucketProduct: BucketProduct = new BucketProduct(
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
      },
      (error) => console.log(error)
    );
  }


}
