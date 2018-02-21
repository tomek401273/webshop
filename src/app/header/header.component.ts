import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  constructor() { }

  ngOnInit() {
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
