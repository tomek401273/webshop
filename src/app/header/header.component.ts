import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from "../auth/loging.service";
import {Router} from "@angular/router";
import {BucketService} from "../bucket-user/bucket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  authenticated = false;
  private actualNumberProducts: number;

  constructor(private logingService: LogingService,
              private router: Router,
              private bucketService: BucketService) {
  }

  private adminPanel = false;

  ngOnInit() {
    this.logingService.loginSuccessful.subscribe(
      (role: String) => {
        if (role === "admin") {
          this.adminPanel = true;
        }
        if (this.logingService.isAuthenticated()) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      }
    )
    this.calculateNumberProducts();
    this.bucketService.bucketStatus.subscribe(
      (result) => {
        this.actualNumberProducts = +result;
      }
    )
  }

  calculateNumberProducts() {
    let bucket = JSON.parse(localStorage.getItem("bucket123"));
    let total = 0;
    for (let i = 0; i < bucket.length; i++) {
      total += bucket[i]._amount;
    }
    this.actualNumberProducts = total;
  }


  ngDoCheck() {
    this.logingService.logoutEmitter.subscribe(
      (logout: boolean) => {
        if (logout == true) {
          this.adminPanel = false;
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
