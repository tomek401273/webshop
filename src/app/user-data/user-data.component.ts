import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ShippingAddress} from '../model/shipping-address';
import {BucketService} from '../services/bucket.service';
import {BucketServerService} from '../services/bucket-server.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Register} from '../model/register';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @ViewChild('error') private _error: SwalComponent;
  @ViewChild('success') private _success: SwalComponent;
  private _userAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  @ViewChild('form') private _signUp: NgForm;
  private _loginAvailable = true;
  private _submitEnabled = false;
  private _country = '';
  private _validAddress = false;
  private _validatedAddress: string;
  @ViewChild('house') private _house: NgForm;
  private _changeAddress = false;
  private _userLogin = '';

  constructor(private bucketServerService: BucketServerService,
              private logingService: LogingService,
              private modalService: BsModalService,
              private router: Router) {
  }

  ngOnInit() {
    this.userLogin = localStorage.getItem('login');
    console.log(this._userLogin);
    this.bucketServerService.getAddressShippment().subscribe(
      (response: ShippingAddress) => {
        console.log(response);
        this._userAddress = response;
      },
      () => {
        this._error.show();
      }
    );
  }


  correctAddress(isCorrect: boolean) {
    console.log('isCorrect Address? ' + isCorrect);
    this.validAddress = isCorrect;
  }


  onDefaultPassword() {
    this.changeAddress = false;
    this.validAddress = false;
    this.validatedAddress = '';
  }

  onAddressInput(userAddress: string) {
    console.log('usser addres correct inject in signUP component');
    console.log(userAddress);
    this._validatedAddress = userAddress;

  }

  onSearchChange(typedValue: string) {
    if (typedValue.length > 5) {
      this.onCheckLoginAvaiable(typedValue);
    }
  }

  onSubmit() {
    const register = new Register();
    register.login = this.signUp.value.login;
    register.name = this.signUp.value.name;
    register.surname = this.signUp.value.surname;
    // register.password = 'kemot555';
    if (this.userAddress.street === null) {
      register.address = this.userAddress.district + ', '
        + this.userAddress.postCode + ' '
        + this.userAddress.city + ', '
        + this.userAddress.country;
    } else {
      register.address = this.userAddress.street + ', '
        + this.userAddress.postCode + ' '
        + this.userAddress.city + ', '
        + this.userAddress.country;
    }
    // register.house = 22;
    register.house = this._house.value.houseNumber;
    // register.apartment = 22;
    register.apartment = this._house.value.apartmentNumber;

    console.log('Register');
    console.log(register);
    if (this.changeAddress) {
      register.address = this._validatedAddress;
    }

    this.logingService.updateAccount(register)
      .subscribe(
        () => {
          this._success.show();
          this.router.navigate(['/']);
        },
        () => {
          this._error.show();
        }
      );
  }

  userAddressLog() {
    console.log(this.userAddress);
  }

  onCheckLoginAvaiable(login) {

    this.logingService.checkLoginAvailable(login).subscribe(
      (resonse: HttpResponse<any>) => {
        if (resonse.body === 'true') {
          this._loginAvailable = true;
        } else {
          this._loginAvailable = false;
        }
      },
      () => {
        this._error.show();
      }
    );
  }

  get signUp(): NgForm {
    return this._signUp;
  }

  set signUp(value: NgForm) {
    this._signUp = value;
  }

  get loginAvailable(): boolean {
    return this._loginAvailable;
  }

  set loginAvailable(value: boolean) {
    this._loginAvailable = value;
  }

  get submitEnabled(): boolean {
    return this._submitEnabled;
  }

  set submitEnabled(value: boolean) {
    this._submitEnabled = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get validAddress(): boolean {
    return this._validAddress;
  }

  set validAddress(value: boolean) {
    this._validAddress = value;
  }

  get validatedAddress(): string {
    return this._validatedAddress;
  }

  set validatedAddress(value: string) {
    this._validatedAddress = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }

  get userAddress(): ShippingAddress {
    return this._userAddress;
  }

  set userAddress(value: ShippingAddress) {
    this._userAddress = value;
  }

  get success(): SwalComponent {
    return this._success;
  }

  set success(value: SwalComponent) {
    this._success = value;
  }

  get house(): NgForm {
    return this._house;
  }

  set house(value: NgForm) {
    this._house = value;
  }

  get changeAddress(): boolean {
    return this._changeAddress;
  }

  set changeAddress(value: boolean) {
    this._changeAddress = value;
  }


  get userLogin(): string {
    return this._userLogin;
  }

  set userLogin(value: string) {
    this._userLogin = value;
  }
}
