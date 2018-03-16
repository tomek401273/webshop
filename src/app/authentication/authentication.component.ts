import {Component, DoCheck, OnInit, TemplateRef} from '@angular/core';
import {LogingService} from "../services/loging.service";
import {Router} from "@angular/router";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {ServerService} from "../services/server.service";
import {BucketServerService} from "../bucket-user/bucket-server.service";
import {isNull} from "util";
import {ProductDataAmount} from "../model/product-data-amount";
import {Log} from "../model/Log";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, DoCheck {
  private isAuthenticated = false;
  private loginUser ="";
  private roleUser ="";
  modalRef: BsModalRef;
  private productIdArray: number[] = [];
  private products: ProductDataAmount[] = [];
  name = 'thomas';
  password = 'thomas';
  message = '';

  constructor(private logginService: LogingService,
              private router: Router,
              private modalService: BsModalService,
              private server: ServerService,
              private bucketServerService: BucketServerService


  ) {
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.isAuthenticated = this.logginService.isAuthenticated();
    this.loginUser =localStorage.getItem("login");
    this.roleUser = localStorage.getItem("role");
  }

  onRedirect(page){
    this.router.navigate([page])
  }

  onLogOut(){
    this.logginService.logOut();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onSubmit(submittedForm) {
    let log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this.logginService.getToken(log)
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
          this.logginService.loginSuccessful.emit(role);

          this.modalRef.hide();

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


