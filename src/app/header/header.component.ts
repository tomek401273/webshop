import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';
import {BucketService} from '../bucket-user/bucket.service';
import {isNull} from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  authenticated = false;
  private actualNumberProducts: number;
  private adminPanel = false;

  constructor(private logingService: LogingService,
              private router: Router,
              private bucketService: BucketService) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'admin, user') {
      this.adminPanel = true;
    }

    this.logingService.loginSuccessful.subscribe(
      (role: String) => {
        if (role === 'admin, user') {
          this.adminPanel = true;
        }
        if (this.logingService.isAuthenticated()) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      }
    );

    this.bucketService.bucketStatus.subscribe(
      (result) => {
        this.actualNumberProducts = +result;
      }
    );
  }

  calculateNumberProducts() {
    let bucket = JSON.parse(localStorage.getItem('bucket123'));
    let total = 0;
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        total += bucket[i]._totalAmount;
      }
      this.actualNumberProducts = total;
    } else {
      this.actualNumberProducts = 0;
    }

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
    );
    this.calculateNumberProducts();
  }
}
