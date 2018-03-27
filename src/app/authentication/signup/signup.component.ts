import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Register} from "../../model/register";
import {LogingService} from "../../services/loging.service";
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('form') signUp: NgForm;
  controlCheckBoxStatus = false;
  modalRef: BsModalRef;
  loginAvailable: boolean = true;
  submitEnabled = false;

  constructor(private logingService: LogingService,
              private modalService: BsModalService,
              private router: Router) {
  }

  onSearchChange(typedValue: string){
    if (typedValue.length>5) {
      this.onCheckLoginAvaiable(typedValue);
    }
  }

  onSubmit() {
    this.onCheckLoginAvaiable(this.signUp.value.login);
    if (this.loginAvailable === true) {
      let register = new Register(this.signUp.value.login, this.signUp.value.name, this.signUp.value.surname, this.signUp.value.passwords.password);
      console.log("account Created");
      console.log(register);

      this.logingService.registration(register)
        .subscribe(
          (resposne) =>{
            console.log(resposne);
            alert("Your registration was successfully");
            this.router.navigate(['/'])
          },
          (error) => console.log(error)
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
    console.log("reading statute");
  }

  onUnlockCheckBoxStatus() {
    this.controlCheckBoxStatus = true;
  }

  onLockCheckBoxStatus() {
    this.controlCheckBoxStatus= false;
  }

  onCheckLoginAvaiable(login) {

    this.logingService.checkLoginAvailable(login).subscribe(
      (resonse: HttpResponse<any>) => {
        if (resonse.body === "true") {
          this.loginAvailable = true;
        } else {
          this.loginAvailable = false;
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
}



