import {Component, OnInit} from '@angular/core';
import {ServerService} from "../services/server.service";
import {Log} from "./Log";
import {LoggingService} from "../services/logging.service";

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  log: Log;

  constructor(private server: ServerService, private loggingService: LoggingService) {
  }

  ngOnInit() {
  }

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

  onSubmit() {
    this.loggingService.getToken();
  }

}

