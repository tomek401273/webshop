import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Register} from '../../model/register';
import {LogingService} from '../../services/loging.service';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('form') signUp: NgForm;
  controlCheckBoxStatus = false;
  modalRef: BsModalRef;
  loginAvailable = true;
  submitEnabled = false;
  country = '';
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  constructor(private logingService: LogingService,
              private modalService: BsModalService,
              private router: Router) {
  }

  onSearchChange(typedValue: string) {
    if (typedValue.length > 5) {
      this.onCheckLoginAvaiable(typedValue);
    }
  }

  onSubmit() {
    this.onCheckLoginAvaiable(this.signUp.value.login);
    if (this.loginAvailable === true) {
      const register = new Register(
        this.signUp.value.login,
        this.signUp.value.name,
        this.signUp.value.surname,
        this.signUp.value.passwords.password,
        this.country,
        this.signUp.value.city,
        this.signUp.value.postcode,
        this.signUp.value.street);

      this.logingService.registration(register)
        .subscribe(
          () => {
            this.success.show();
            this.router.navigate(['/']);
          },
          () => {
            this.error.show();
          }
        );
    } else {
      this.loginAvailable = false;
    }
  }

  onCheckBoxClicked() {
    this.submitEnabled = true;
  }

  onReadStatute(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onUnlockCheckBoxStatus() {
    this.controlCheckBoxStatus = true;
  }

  onLockCheckBoxStatus() {
    this.controlCheckBoxStatus = false;
  }

  onCheckLoginAvaiable(login) {

    this.logingService.checkLoginAvailable(login).subscribe(
      (resonse: HttpResponse<any>) => {
        if (resonse.body === 'true') {
          this.loginAvailable = true;
        } else {
          this.loginAvailable = false;
        }
      },
      () => {
        this.error.show();
      }
    );
  }
}



