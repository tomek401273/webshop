import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from "../auth/loging.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated = false;

  constructor(private logingService: LogingService) {
  }

 private adminPanel = false;

  ngOnInit() {
    this.logingService.loginSuccessful.subscribe(
      (role: String) => {
        if (role==="admin") {
          this.adminPanel =true;
        }
        if (this.logingService.isAuthenticated()) {
          this.authenticated= true;
        } else {
          this.authenticated =false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.logingService.logOut();
  }


  logOut() {
    this.logingService.logOut();
    this.authenticated = false;
  }



}
