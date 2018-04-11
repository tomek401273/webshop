import {Component, DoCheck, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ServerService} from '../services/server.service';
import {ProductData} from '../model/product-data';
import {ShowPublicDataSevice} from '../services/show-public-data.sevice';
import {PagerService} from '../services/navigation/pager.service';
import {BucketService} from '../bucket-user/bucket.service';
import {ProductDataAmount} from '../model/product-data-amount';
import {isNull, isUndefined} from 'util';
import {BucketServerService} from '../bucket-user/bucket-server.service';
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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  private products: ProductDataAmount[] = [];
  productsTitle: String[] = [];
  chosenTitle: string;
  private bucketProducts: ProductDataAmount[] = [];
  private pager: any = {};
  private pagedProduct: any[];
  isAuthenticated = false;
  private typedTitleLengthTemp = 0;
  private sale = 'sale';
  @ViewChild('form') searchForm: NgForm;
  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  advancedSlider = {name: 'Advanced Slider', onFinish: undefined};
  private above = 0;
  private below = 120;
  maxValueProductInShop: number;
  maxValueCover = 3000;
  minValueCover = 23;
  modalRef: BsModalRef;
  categoryNames: string[] = [];


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
    this.above = event.from;
    this.below = event.to;
  }

  setAdvancedSliderTo() {
    this.advancedSliderElement.update({from: this.above, to: this.below});
  }

  onFilterDatabaseWithPriceBetween() {
    this.showPublicData.filterProductWithPriceBetween(this.above, this.below).subscribe(
      (products: any[]) => {
        if (products.length === 0) {
          this.products = [];
          this.pagedProduct = [];
        } else {
          this.products = products;
          this.setPage(1);
        }
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.getAllProductsTitle();
    this.getProductTitlesFromService();
    this.getTemp();
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductDataAmount) => this.products.splice(this.products.indexOf(product), 1)
    );
    this.getDataFromDatabase();
    this.getCategoryNames();

  }

  ngDoCheck() {
    this.isAuthenticated = this.logingServiece.isAuthenticated();
  }

  getDataFromDatabase() {
    this.showPublicData.getProducts()
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.setPage(1);
        },
        (error) => console.log(error)
      );
  }

  setPage(page: number) {
    if (page < 1 || page > this.products.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.products.length, page);
    this.pagedProduct = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onAddToCard(product: ProductData) {
    this.showPublicData.checkAvailable(product.id).subscribe(
      (resposne) => {
        if (resposne > 0) {

          this.addProductToBucket(product);
          this.saveTemp();
          this.acutalNumberProductInBucket();
          if (this.isAuthenticated === true) {
            this.bucketServerService.addProductToCard(product.id).subscribe(
              (resposne2) => {
                if (resposne2 === true) {
                  alert('successfully added product to bucket');
                } else {
                  alert('something go wrong contact with our service');
                }

              }
            );
          }
        } else {
          alert('This product is not available');
        }

      },
      (error) => console.log(error)
    );
  }

  acutalNumberProductInBucket() {
    let totalNumber = 0;
    for (const prod of this.bucketProducts) {
      totalNumber += prod.totalAmount;
    }
    this.bucketService.bucketStatus.emit(totalNumber.toString());
  }

  addProductToBucket(product: ProductData) {
    const founded: ProductDataAmount = this.bucketProducts.find(x => x.id === product.id);

    if (isUndefined(founded)) {
      this.bucketProducts.push(new ProductDataAmount(
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
      const index = this.bucketProducts.indexOf(founded);
      let amount = founded.totalAmount;
      amount++;
      founded.totalAmount = amount;
      this.bucketProducts[index] = founded;
    }
  }

  saveTemp() {
    localStorage.setItem('bucket123', null);
    const bucketToSave = JSON.stringify(this.bucketProducts);
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
        this.bucketProducts.push(bucketProduct);
      }
    }
  }

  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this.productsTitle = directoryTitles.titles;
    });
  }

  getProductTitlesFromService() {
    this.productsTitle = this.showPublicData.getProductTitles();
  }

  onSearchProductWithTitle() {
    if (this.chosenTitle.length === 1 && this.typedTitleLengthTemp === 3) {
      this.getDataFromDatabase();
      this.typedTitleLengthTemp = 0;
    }

    if (this.chosenTitle.length > 2) {
      this.typedTitleLengthTemp = 3;
      this.showPublicData.searchProductInDatabase(this.chosenTitle).subscribe(
        (products: any[]) => {
          if (products.length === 0) {
            this.products = [];
            this.pagedProduct = [];
          } else {
            this.products = products;
            this.setPage(1);
          }
        },
        (error) => console.log(error)
      );
    }
  }

  onSetSubscription(email, productId) {

    const reminderDto: ReminderDto = new ReminderDto(productId, email.value);
    this.showPublicData.setReminder(reminderDto).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
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
    this.maxValueProductInShop = response;
    this.maxValueCover = this.maxValueProductInShop - (this.maxValueProductInShop / 5);
    this.minValueCover = this.maxValueProductInShop / 5;
    if (this.minValueCover > 100) {
      this.minValueCover = 100;
    }
    this.above = this.minValueCover;
    this.below = this.maxValueCover;
  }

  onMarkProduct(mark, productId) {
    const productMarkDto: ProductMarkDto = new ProductMarkDto(localStorage.getItem('login'), productId, mark.value);
    console.log(productMarkDto);
    this.serverService.markProduct(productMarkDto).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  onRated(rate, productId) {
    if (this.isAuthenticated) {
      const productMarkDto: ProductMarkDto = new ProductMarkDto(localStorage.getItem('login'), productId, rate.rate);
      this.serverService.markProduct(productMarkDto).subscribe(
        (response: number) => {
          this.products.find(x => x.id === productId).marksAverage = response;
          this.products.find(x => x.id === productId).rated = true;
          this.setPage(1);
        },
        (error) => console.log(error)
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitNewsLetter(newsLetter) {
    console.log(newsLetter.value.name);
    console.log(newsLetter.value.email);
    this.showPublicData.subscribeNewsletter(newsLetter.value.name, newsLetter.value.email).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  onAddComment(commentMessage, productId) {
    const comment: Comment = new Comment(localStorage.getItem('login'), commentMessage.value, productId);
    this.serverService.addComment(comment).subscribe(
      (response: boolean) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  onRemoveComment(commentId) {
    console.log(commentId);
    this.serverService.removeComment(commentId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  onEditComment(editMessage, commentId) {
    const comment: Comment = new Comment(null, editMessage.value, null);
    comment.id = commentId;
    this.serverService.editComment(comment).subscribe(
      (response) => {
      },
      (error) => console.log(error)
    );
  }

  onShowProduct(productId) {
    console.log(productId);
    this.router.navigate(['product/' + productId]);
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this.categoryNames = response;
      },
      (error) => console.log(error)
    );
  }

  onCategory(category: string) {
    console.log(category);
    this.showPublicData.getProductWithCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this.products = response.productDtoList;
        this.setPage(1);
      },
      (error) => console.log(error)
    );
  }

}
