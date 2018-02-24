import {Component, OnInit} from '@angular/core';
import {Register} from "../register";
import {LogingService} from "../loging.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private logingService: LogingService) {
  }

  ngOnInit() {
  }

  onSubmit(data) {
    console.log(data);
    let register = new Register(data.value.login, data.value.name, data.value.surname, data.value.password);
    console.log(register);
    this.logingService.registration(register)
      .subscribe(
        (resposne) => {
          console.log(resposne);
        },
        (error) => console.log(error)
      );
  }

}
