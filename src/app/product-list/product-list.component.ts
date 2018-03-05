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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  private products: ProductData[] = [];
  private bucketProducts: ProductDataAmount[] = [];
  private pager: any = {};
  private pagedProduct: any[];
  private isAuthenticated = false;

  constructor(private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService) {
  }

  ngOnInit() {
    this.getTemp();
    this.serverService.onTaskRemoved.subscribe(
      (product: ProductData) => this.products.splice(this.products.indexOf(product), 1)
    );
    this.showPublicData.getProducts()
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.setPage(1);
        },
        (error) => console.log(error)
      );
  }

  ngDoCheck() {
    this.isAuthenticated = this.logingServiece.isAuthenticated();
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
    for (let prod of this.bucketProducts) {
      totalNumber += prod.amount;
    }
    this.bucketService.bucketStatus.emit(totalNumber.toString());
  }

  addProductToBucket(product: ProductData) {
    let founded: ProductDataAmount = this.bucketProducts.find(x => x.id === product.id);

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
      let index = this.bucketProducts.indexOf(founded);
      let amount = founded.amount;
      amount++;
      founded.amount = amount;
      this.bucketProducts[index] = founded;
    }
  }

  saveTemp() {
    localStorage.setItem('bucket123', null);
    let bucketToSave = JSON.stringify(this.bucketProducts);
    localStorage.setItem('bucket123', bucketToSave);
  }

  getTemp() {
    let bucket = JSON.parse(localStorage.getItem('bucket123'));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        let bucketProduct: ProductDataAmount = new ProductDataAmount(
          bucket[i]._id,
          bucket[i]._price,
          bucket[i]._title,
          bucket[i]._description,
          bucket[i]._imageLink,
          bucket[i]._amount);
        this.bucketProducts.push(bucketProduct);
      }
    }
  }
}
