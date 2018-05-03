import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';
import {BucketService} from '../services/bucket.service';
import {isNull} from 'util';
import {OrdersService} from '../services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  private _actualNumberProducts: number;
  private _adminPanel = false;

  constructor(private logingService: LogingService,
              private router: Router,
              private bucketService: BucketService,
              private orderService: OrdersService) {
  }

  get actualNumberProducts(): number {
    return this._actualNumberProducts;
  }

  set actualNumberProducts(value: number) {
    this._actualNumberProducts = value;
  }

  get adminPanel(): boolean {
    return this._adminPanel;
  }

  set adminPanel(value: boolean) {
    this._adminPanel = value;
  }

  isAdmin(role: string) {
    if (role === 'admin, user') {
      this._adminPanel = true;
      this.orderService.getAllUserLogin();
    }
  }

  ngOnInit() {
    this.isAdmin(localStorage.getItem('role'));
    this.logingService.loginSuccessful.subscribe(
      (role: string) => {
        this.isAdmin(role);
      }
    );

    this.bucketService.bucketStatus.subscribe(
      (result) => {
        this._actualNumberProducts = +result;
      }
    );

    this.bucketService.buyAllProduct.subscribe(
      (result) => {
        this._actualNumberProducts = 0;
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
      this._actualNumberProducts = total;
    } else {
      this._actualNumberProducts = 0;
    }

  }

  ngDoCheck() {
    this.logingService.logoutEmitter.subscribe(
      (logout: boolean) => {
        if (logout) {
          this._adminPanel = false;
          this.router.navigate(['/']);
        }
      }
    );
    this.calculateNumberProducts();
  }
}
