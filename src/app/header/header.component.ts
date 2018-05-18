import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';
import {BucketService} from '../services/bucket.service';
import {isNull} from 'util';
import {OrdersService} from '../services/orders.service';
import {ShowPublicDataSevice} from '../services/show-public-data.sevice';
import {Category} from '../model/Category';
import {DirectoryTitles} from '../model/directory-titles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  private _actualNumberProducts: number;
  private _adminPanel = false;
  private _categoryNames: string[] = [];
  private _chosenTitle: string;
  private _productsTitle: String[] = [];
  private _isAuthenticated = false;
  private _isCategory = false;

  constructor(private logingService: LogingService,
              private router: Router,
              private bucketService: BucketService,
              private orderService: OrdersService,
              private showPublicData: ShowPublicDataSevice) {
  }

  onBackToBegin() {
    this.router.navigate(['/']);
  }

  toBucket() {
    this.router.navigate(['/bucket']);
  }


  isAdmin(role: string) {
    if (role === 'admin, user') {
      this._adminPanel = true;
      this.orderService.getAllUserLogin();
    }
  }

  ngOnInit() {
    this.getAllProductsTitle();
    this.getCategoryNames();
    this.isAdmin(localStorage.getItem('role'));
    this.logingService.loginSuccessful.subscribe(
      (role: string) => {
        this.isAdmin(role);
        this.calculateNumberProducts();
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
    // this.calculateNumberProducts();

  }

  onSearchProductWithTitle() {
    this.showPublicData.searchedProduct.emit(this.chosenTitle);
  }

  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this._productsTitle = directoryTitles.titles;
    });
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this._categoryNames = response;
      },
      (error) => console.log(error)
    );
  }

  onCategory(category: string) {
    this.showPublicData.category.emit(category);
  }

  onCategoryClicked(category) {
    this.isCategory = !this.isCategory;
  }

  calculateNumberProducts() {
    // this._actualNumberProducts = 0;
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    let total = 0;
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        total += bucket[i].totalAmount;
      }
      this._actualNumberProducts = total;
    } else {
      this._actualNumberProducts = 0;
    }

  }

  ngDoCheck() {
    this._isAuthenticated = this.logingService.isAuthenticated();

    this.logingService.logoutEmitter.subscribe(
      (logout: boolean) => {
        if (logout) {
          this._adminPanel = false;
          this.actualNumberProducts = 0;
          this.router.navigate(['/']);
        }
      }
    );
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

  get categoryNames(): string[] {
    return this._categoryNames;
  }

  set categoryNames(value: string[]) {
    this._categoryNames = value;
  }

  get chosenTitle(): string {
    return this._chosenTitle;
  }

  set chosenTitle(value: string) {
    this._chosenTitle = value;
  }

  get productsTitle(): String[] {
    return this._productsTitle;
  }

  set productsTitle(value: String[]) {
    this._productsTitle = value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get isCategory(): boolean {
    return this._isCategory;
  }

  set isCategory(value: boolean) {
    this._isCategory = value;
  }
}
