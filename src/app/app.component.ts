import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from "./auth/loging.service";
import {Session} from "selenium-webdriver";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private logingService: LogingService) {
  }

  ngOnInit() {
    this.logingService.logOut();
    this.logingService.loginSuccessful
      .subscribe(
        (response) => {
          setTimeout(() => {
            if (this.logingService.isAuthenticated()) {
              alert("Your session ares gone. Log in once again");
              this.logingService.logOut();
            }
          }, 1200000)
        }
      )
  }

}
