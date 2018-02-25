import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from "../auth/loging.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  authenticated = false;

  constructor(private logingService: LogingService,
              private router: Router) {
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

  ngDoCheck() {
    this.logingService.logoutEmitter.subscribe(
      (logout: boolean) => {
        if (logout == true) {
          this.adminPanel =false;
          this.authenticated = false;
          this.router.navigate(['/']);
        }
      }
    )
  }


  logOut() {
    this.logingService.logOut();
    this.authenticated = false;
  }



}
