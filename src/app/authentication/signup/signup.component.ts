import {Component, OnInit} from '@angular/core';
import {Register} from "../../model/register";
import {LogingService} from "../../services/loging.service";

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
    let register = new Register(data.value.login, data.value.name, data.value.surname, data.value.password);
    this.logingService.registration(register)
      .subscribe(
        (resposne) => console.log(resposne),
        (error) => console.log(error)
      );
  }
}
