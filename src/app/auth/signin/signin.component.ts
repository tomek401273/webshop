import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from "./Log";
import {ServerService} from "../../services/server.service";
import {LoggingService} from "../../services/logging.service";
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
  name = 'tomek2';
  password = '$2a$10$KEAhNEMjlM9TXmyTNCYE1.v/tFp4ie5kJAibRCv91DkjMJhYpkFh6';
  message ='';
  constructor(
    private server: ServerService,
    private loggingService: LoggingService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    let log: Log = new Log(submittedForm.value.passwordLog, submittedForm.value.loginLog);

    this.loggingService.getToken(log)
      .subscribe(
        (response: HttpResponse<String>) => {
          // console.log(response.headers.get("Authorization"));
          let token = response.headers.get("Authorization");
          localStorage.setItem("token", token);
          localStorage.setItem("role",response.headers.get("CREDENTIALS"));

          console.log("localStorage: " + localStorage.getItem("token"));
          console.log("role: "+localStorage.getItem("role"));
          this.router.navigate(['/']);

        },
        (error) => {
          console.log("something something go wrong .... ");
          this.message = "something something go wrong ....";
          this.name="";
          this.password=""
        }
      );
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
