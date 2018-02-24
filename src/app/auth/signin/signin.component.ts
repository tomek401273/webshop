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

  // @ViewChild('form') loginForm: NgForm;
  name = 'tomek4';
  password = '$2a$10$1jqMcOyaoPpF1pYTERFHYum1ox1W2evZX/GDuSDdRMb3YUjH.f3RW';
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

  //
  // onSubmit(submittedForm) {
  //
  //   this.server.onLogin(this.log).subscribe(
  //     data => {
  //       localStorage.setItem("token", JSON.parse(JSON.stringify(data))._body);
  //       console.log(localStorage.getItem("token"));
  //       error => console.log(error);
  //
  //     }
  //   )

  //   onSubmit() {
  //     this.server.onLogin(this.log).subscribe(
  //         data => {
  //           // localStorage.setItem("token", JSON.parse(JSON.stringify(data))._body);
  //           // console.log(localStorage.getItem("token"));
  //          // console.log(data.json())
  //         },
  //         error => console.log('error')
  //       );
  //
  // }

  // onSubmit(){
  //   this.server.onLogin().subscribe(
  //     data => {
  //       console.log(data)
  //     },
  //     error => console.log(error)
  //   )
  // }

  // onSubmit() {
  //   this.loggingService.getToken();
  // }

}
