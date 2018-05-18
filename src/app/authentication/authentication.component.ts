import {Component, DoCheck, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';
import {ProductDataAmount} from '../model/product-data-amount';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ServerService} from '../services/server.service';
import {BucketServerService} from '../services/bucket-server.service';
import {HttpResponse} from '@angular/common/http';
import {isNull} from 'util';
import {Log} from '../model/Log';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, DoCheck {
  private _isAuthenticated = false;
  private _loginUser = '';
  private _roleUser = '';


  private productIdArray: number[] = [];
  private products: ProductDataAmount[] = [];
  private modalRef: BsModalRef;
  private name = 'tomek371240@gmail.com';
  private password = 'thomas';
  private message = '';
  @ViewChild('success') private success: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  private _role = '';

  constructor(private _logginService: LogingService,
              private _loggingService: LogingService,
              private _router: Router,
              private _server: ServerService,
              private _bucketServerService: BucketServerService,
              private _modalService: BsModalService) {
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get loginUser(): string {
    return this._loginUser;
  }

  set loginUser(value: string) {
    this._loginUser = value;
  }

  get roleUser(): string {
    return this._roleUser;
  }

  set roleUser(value: string) {
    this._roleUser = value;
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this._isAuthenticated = this._logginService.isAuthenticated();
    this._loginUser = localStorage.getItem('login');
    this._roleUser = localStorage.getItem('role');
  }

  onRedirect(page) {
    this._router.navigate([page]);
  }

  onLogOut() {
    this._logginService.logOut();
  }

  get server(): ServerService {
    return this._server;
  }

  set server(value: ServerService) {
    this._server = value;
  }

  get loggingService(): LogingService {
    return this._loggingService;
  }

  set loggingService(value: LogingService) {
    this._loggingService = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get bucketServerService(): BucketServerService {
    return this._bucketServerService;
  }

  set bucketServerService(value: BucketServerService) {
    this._bucketServerService = value;
  }

  get modalService(): BsModalService {
    return this._modalService;
  }

  set modalService(value: BsModalService) {
    this._modalService = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  onSubmit(submittedForm) {
    const log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this._loggingService.getToken(log)
      .subscribe(
        (response: HttpResponse<String>) => {
          const token = response.headers.get('Authorization');
          this.role = response.headers.get('Credentials');
          localStorage.setItem('login', submittedForm.value.loginLog);
          localStorage.setItem('token', token);
          localStorage.setItem('role', this.role);

          const expiredToken = new Date().getTime() + (30 * 60 * 1000);
          localStorage.setItem('expiredToken', expiredToken.toString());

          this.getDataFromLocalStorage();

          this._bucketServerService.addProductListToCard(this.productIdArray).subscribe(
            (response2) => {
              this.success.text = 'Your product has succesfully restored';
              this.success.show();
            },
            () => this.error.show()
          );
          this.productIdArray = [];
          this.getDataFromDatabase();
          this.modalRef.hide();
        },
        () => {
          this.somethingGoWrong();
          this.error.show();
        }
      );
  }

  getDataFromLocalStorage() {
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    this.products = [];
    if (!isNull(bucket)) {
      console.log('login');
      console.log(bucket);
      for (let i = 0; i < bucket.length; i++) {
        for (let j = 0; j < bucket[i]._totalAmount; j++) {
          this.productIdArray.push(bucket[i]._id);
        }
      }
      for (let i = 0; i < bucket.length; i++) {
        const bucketProduct: ProductDataAmount = new ProductDataAmount(
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
      localStorage.setItem('bucket123', null);

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
    this._bucketServerService.getProductListFromDatabase().subscribe(
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
        const datatoLocalStorage = JSON.stringify(this.products);
        localStorage.setItem('bucket123', datatoLocalStorage);
        this._loggingService.loginSuccessful.emit(this.role);

      },
      () => this.error.show()
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }
}


