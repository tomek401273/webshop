import {Component, DoCheck, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ServerService} from '../services/server.service';
import {ProductData} from '../model/product-data';
import {ShowPublicDataSevice} from '../services/show-public-data.sevice';
import {PagerService} from '../services/navigation/pager.service';
import {BucketService} from '../services/bucket.service';
import {ProductDataAmount} from '../model/product-data-amount';
import {isNull, isUndefined} from 'util';
import {BucketServerService} from '../services/bucket-server.service';
import {LogingService} from '../services/loging.service';

import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {IonRangeSliderComponent} from 'ng2-ion-range-slider';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {DirectoryTitles} from '../model/directory-titles';
import {ReminderDto} from '../model/dto/reminder-dto';
import {ProductMarkDto} from '../model/dto/product-mark-dto';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Comment} from '../model/comment';
import {Router} from '@angular/router';
import {Category} from '../model/Category';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  private _products: ProductDataAmount[] = [];
  private _productsTitle: String[] = [];
  private _chosenTitle: string;
  private _bucketProducts: ProductDataAmount[] = [];
  private _pager: any = {};
  private _pagedProduct: any[];
  private _isAuthenticated = false;
  private _typedTitleLengthTemp = 0;
  private _sale = 'sale';
  @ViewChild('form') private _searchForm: NgForm;
  @ViewChild('advancedSliderElement') private _advancedSliderElement: IonRangeSliderComponent;
  private _advancedSlider = {name: 'Advanced Slider', onFinish: undefined};
  private _above = 0;
  private _below = 120;
  private _maxValueProductInShop: number;
  private _maxValueCover = 3000;
  private _minValueCover = 23;
  private _modalRef: BsModalRef;
  private _categoryNames: string[] = [];
  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService,
              private modalService: BsModalService,
              private router: Router) {
    this.getMaxPriceProduct();

  }

  finish(slider, event) {
    slider.onFinish = event;
    this._above = event.from;
    this._below = event.to;
  }

  setAdvancedSliderTo() {
    this._advancedSliderElement.update({from: this._above, to: this._below});
  }

  onFilterDatabaseWithPriceBetween() {
    this.showPublicData.filterProductWithPriceBetween(this._above, this._below).subscribe(
      (products: any[]) => {
        if (products.length === 0) {
          this._products = [];
          this._pagedProduct = [];
        } else {
          this._products = products;
          this.setPage(1);
        }
      },
      () => this._error.show()
    );
  }

  ngOnInit() {
    this.getAllProductsTitle();
    this.getProductTitlesFromService();
    this.getTemp();
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductDataAmount) => this._products.splice(this._products.indexOf(product), 1)
    );
    this.getDataFromDatabase();
    this.getCategoryNames();
  }

  ngDoCheck() {
    this._isAuthenticated = this.logingServiece.isAuthenticated();
  }

  getDataFromDatabase() {
    this.showPublicData.getProducts()
      .subscribe(
        (products: any[]) => {
          this._products = products;
          this.setPage(1);
        },
        (error) => this._error.show()
      );
  }

  setPage(page: number) {
    if (page < 1 || page > this._products.length) {
      return;
    }
    this._pager = this.pagerService.getPager(this._products.length, page);
    this._pagedProduct = this._products.slice(this._pager.startIndex, this._pager.endIndex + 1);
  }

  onAddToCard(product) {
    console.log(product);
    this.showPublicData.checkAvailable(product.id).subscribe(
      (resposne) => {
        if (resposne > 0) {

          this.addProductToBucket(product);
          this.saveTemp();
          this.acutalNumberProductInBucket();
          if (this._isAuthenticated === true) {
            this.bucketServerService.addProductToCard(product.id).subscribe(
              (resposne2) => {
                if (resposne2 === true) {
                  this._success.show();
                } else {
                  this._error.show();
                }

              }
            );
          }
        } else {
          this._error.show();
        }

      },
      (error) => this._error.show()
    );
  }

  acutalNumberProductInBucket() {
    let totalNumber = 0;
    for (const prod of this._bucketProducts) {
      totalNumber += prod.getTotalAmount;
    }
    this.bucketService.bucketStatus.emit(totalNumber.toString());
  }

  addProductToBucket(product) {
    const founded: ProductDataAmount = this._bucketProducts.find(x => x.getId === product.id);

    if (isUndefined(founded)) {
      this._bucketProducts.push(new ProductDataAmount(
        product.id,
        product.price,
        product.title,
        product.description,
        product.imageLink,
        1,
        null,
        null));
      return;
    } else {
      const index = this._bucketProducts.indexOf(founded);
      let amount = founded.getTotalAmount;
      amount++;
      founded.setTotalAmount = amount;
      this._bucketProducts[index] = founded;
    }
  }

  saveTemp() {
    localStorage.setItem('bucket123', null);
    const bucketToSave = JSON.stringify(this._bucketProducts);
    localStorage.setItem('bucket123', bucketToSave);
  }

  getTemp() {
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        const bucketProduct: ProductDataAmount = new ProductDataAmount(
          bucket[i]._id,
          bucket[i]._price,
          bucket[i]._title,
          bucket[i]._description,
          bucket[i]._imageLink,
          bucket[i]._totalAmount,
          null,
          null);
        this._bucketProducts.push(bucketProduct);
      }
    }
  }

  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this._productsTitle = directoryTitles.titles;
    });
  }

  getProductTitlesFromService() {
    this._productsTitle = this.showPublicData.getProductTitles();
  }

  onSearchProductWithTitle() {
    if (this._chosenTitle.length === 1 && this._typedTitleLengthTemp === 3) {
      this.getDataFromDatabase();
      this._typedTitleLengthTemp = 0;
    }

    if (this._chosenTitle.length > 2) {
      this._typedTitleLengthTemp = 3;
      this.showPublicData.searchProductInDatabase(this._chosenTitle).subscribe(
        (products: any[]) => {
          if (products.length === 0) {
            this._products = [];
            this._pagedProduct = [];
          } else {
            this._products = products;
            this.setPage(1);
          }
        },
        (error) => this._error.show()
      );
    }
  }

  onSetSubscription(email, productId) {

    const reminderDto: ReminderDto = new ReminderDto(productId, email.value);
    this.showPublicData.setReminder(reminderDto).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => this._error.show()
    );
  }

  getMaxPriceProduct() {
    this.calculateSliderValues(this.showPublicData.getMaxPrice());

    this.showPublicData.mavPriceEmitter.subscribe(
      (response: number) => {
        this.calculateSliderValues(response);
      }
    );
  }

  calculateSliderValues(response) {
    this._maxValueProductInShop = response;
    this._maxValueCover = this._maxValueProductInShop - (this._maxValueProductInShop / 5);
    this._minValueCover = this._maxValueProductInShop / 5;
    if (this._minValueCover > 100) {
      this._minValueCover = 100;
    }
    this._above = this._minValueCover;
    this._below = this._maxValueCover;
  }

  openModal(template: TemplateRef<any>) {
    this._modalRef = this.modalService.show(template);
  }

  submitNewsLetter(newsLetter) {
    this.showPublicData.subscribeNewsletter(newsLetter.value.name, newsLetter.value.email).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => this._error.show()
    );
  }

  onShowProduct(productId) {
    this.router.navigate(['product/' + productId]);
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this._categoryNames = response;
      },
      (error) => this._error.show()
    );
  }

  onCategory(category: string) {
    console.log(category);
    this.showPublicData.getProductWithCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this._products = response.productDtoList;
        this.setPage(1);
      },
      (error) => this._error.show()
    );
  }

  get products(): ProductDataAmount[] {
    return this._products;
  }

  set products(value: ProductDataAmount[]) {
    this._products = value;
  }

  get productsTitle(): String[] {
    return this._productsTitle;
  }

  set productsTitle(value: String[]) {
    this._productsTitle = value;
  }

  get chosenTitle(): string {
    return this._chosenTitle;
  }

  set chosenTitle(value: string) {
    this._chosenTitle = value;
  }

  get bucketProducts(): ProductDataAmount[] {
    return this._bucketProducts;
  }

  set bucketProducts(value: ProductDataAmount[]) {
    this._bucketProducts = value;
  }

  get pager(): any {
    return this._pager;
  }

  set pager(value: any) {
    this._pager = value;
  }

  get pagedProduct(): any[] {
    return this._pagedProduct;
  }

  set pagedProduct(value: any[]) {
    this._pagedProduct = value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get typedTitleLengthTemp(): number {
    return this._typedTitleLengthTemp;
  }

  set typedTitleLengthTemp(value: number) {
    this._typedTitleLengthTemp = value;
  }

  get sale(): string {
    return this._sale;
  }

  set sale(value: string) {
    this._sale = value;
  }

  get searchForm(): NgForm {
    return this._searchForm;
  }

  set searchForm(value: NgForm) {
    this._searchForm = value;
  }

  get advancedSliderElement(): IonRangeSliderComponent {
    return this._advancedSliderElement;
  }

  set advancedSliderElement(value: IonRangeSliderComponent) {
    this._advancedSliderElement = value;
  }

  get advancedSlider(): { name: string; onFinish: undefined } {
    return this._advancedSlider;
  }

  set advancedSlider(value: { name: string; onFinish: undefined }) {
    this._advancedSlider = value;
  }

  get above(): number {
    return this._above;
  }

  set above(value: number) {
    this._above = value;
  }

  get below(): number {
    return this._below;
  }

  set below(value: number) {
    this._below = value;
  }

  get maxValueProductInShop(): number {
    return this._maxValueProductInShop;
  }

  set maxValueProductInShop(value: number) {
    this._maxValueProductInShop = value;
  }

  get maxValueCover(): number {
    return this._maxValueCover;
  }

  set maxValueCover(value: number) {
    this._maxValueCover = value;
  }

  get minValueCover(): number {
    return this._minValueCover;
  }

  set minValueCover(value: number) {
    this._minValueCover = value;
  }

  get modalRef(): BsModalRef {
    return this._modalRef;
  }

  set modalRef(value: BsModalRef) {
    this._modalRef = value;
  }

  get categoryNames(): string[] {
    return this._categoryNames;
  }

  set categoryNames(value: string[]) {
    this._categoryNames = value;
  }

  get success(): SwalComponent {
    return this._success;
  }

  set success(value: SwalComponent) {
    this._success = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }
}
