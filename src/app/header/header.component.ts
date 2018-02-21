import { Component, OnInit } from '@angular/core';
import {LogingService} from "../auth/loging.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  constructor(private logingService: LogingService) { }
  adminPanel=false;
  ngOnInit() {
    this.logingService.loginSuccessful.subscribe(
      (role:String) => {
        this.adminPanel=true;
        console.log(localStorage.getItem("role"));
        console.log(localStorage.getItem("token"));
      }
    )
  }

  login() {
    this.authenticated = !this.authenticated;
  }

  adminLogin() {

    console.log("Admin login");
  }
  userLogin() {
    console.log("User Login")
  }

}
