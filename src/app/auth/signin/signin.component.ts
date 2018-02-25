import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Log} from "./Log";
import {ServerService} from "../../services/server.service";
import {LogingService} from "../loging.service";
import {NgForm} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  name = 'alpha';
  password = 'alpha';
  message = '';

  constructor(private server: ServerService,
              private loggingService: LogingService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    let log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this.loggingService.getToken(log)
      .subscribe(
        (response: HttpResponse<String>) => {
          let token = response.headers.get("Authorization");
          let role = response.headers.get("Credentials");
          localStorage.setItem("login", submittedForm.value.loginLog);
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          this.loggingService.loginSuccessful.emit(role);
          this.router.navigate(['/']);

        },
        (error) => {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          this.somethingGoWrong();
        }
      );
  }

  somethingGoWrong() {
    this.message = "something something go wrong ....";
    this.name = "";
    this.password = ""
  }

}
