import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Register} from '../../model/register';
import {LogingService} from '../../services/loging.service';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('form') private _signUp: NgForm;
  private _controlCheckBoxStatus = false;
  private _modalRef: BsModalRef;
  private _loginAvailable = true;
  private _submitEnabled = false;
  private _country = '';
  private _validAddress = false;
  private _validatedAddress: string;

  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;
  private _houseNumber = 0;
  private _apartmentNumber = 0;
  @ViewChild('house') private house: NgForm;


  constructor(private logingService: LogingService,
              private modalService: BsModalService,
              private router: Router,
              private publicServer: ShowPublicDataSevice) {
  }

  correctAddress(isCorrect: boolean) {
    console.log('isCorrect Address? ' + isCorrect);
    this.validAddress = isCorrect;
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
    register.password = this.signUp.value.passwords.password;
    register.address = this._validatedAddress;
    register.house = this.house.value.houseNumber;
    register.apartment = this.house.value.apartmentNumber;

    console.log('Register');
    console.log(register);


    this.logingService.registration(register)
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

  onCheckBoxClicked() {
    this._submitEnabled = true;
  }

  onReadStatute(template: TemplateRef<any>) {
    this._modalRef = this.modalService.show(template);
  }

  onUnlockCheckBoxStatus() {
    this._controlCheckBoxStatus = true;
  }

  onLockCheckBoxStatus() {
    this._controlCheckBoxStatus = false;
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

  get controlCheckBoxStatus(): boolean {
    return this._controlCheckBoxStatus;
  }

  set controlCheckBoxStatus(value: boolean) {
    this._controlCheckBoxStatus = value;
  }

  get modalRef(): BsModalRef {
    return this._modalRef;
  }

  set modalRef(value: BsModalRef) {
    this._modalRef = value;
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

  get success(): SwalComponent {
    return this._success;
  }

  set success(value: SwalComponent) {
    this._success = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
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

  get houseNumber(): number {
    return this._houseNumber;
  }

  set houseNumber(value: number) {
    this._houseNumber = value;
  }

  get apartmentNumber(): number {
    return this._apartmentNumber;
  }

  set apartmentNumber(value: number) {
    this._apartmentNumber = value;
  }
}



