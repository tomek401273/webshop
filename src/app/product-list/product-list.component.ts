import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  private products: ProductData[] = [];
  productsTitle: String[] = [];
  chosenTitle: string;
  private bucketProducts: ProductDataAmount[] = [];
  private pager: any = {};
  private pagedProduct: any[];
  private isAuthenticated = false;
  private typedTitleLengthTemp = 0;
  @ViewChild('form') searchForm: NgForm;
  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  advancedSlider = {name: 'Advanced Slider', onFinish: undefined};
  private above = 0;
  private below = 100;

  constructor(private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService) {
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
    this.getTemp();
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductData) => this.products.splice(this.products.indexOf(product), 1)
    );
    this.getDataFromDatabase();
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
          console.log('Avaiable products' + resposne);
        } else {
          alert('This product is not available');
        }

      },
      (error) => console.log(error)
    );
    if (this.isAuthenticated === true) {
      this.bucketServerService.addProductToCard(product.id).subscribe(
        (resposne) => {
          if (resposne === true) {
            alert('succesfully added product to bucket');
          } else {
            alert('something go wrong contact with our service');
            console.log(resposne);
          }

        }
      );
    }

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
        1));
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
          bucket[i]._totalAmount);
        this.bucketProducts.push(bucketProduct);
      }
    }
  }

  getAllProductsTitle() {
    setTimeout(() => {
      this.productsTitle = this.showPublicData.getProductsTitles();
    }, 2000);
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

}
