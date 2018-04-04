import {Component, DoCheck, OnInit} from '@angular/core';
import {BucketService} from './bucket.service';
import {ProductDataAmount} from '../model/product-data-amount';
import {isNull} from 'util';
import {Router} from '@angular/router';
import {BucketServerService} from './bucket-server.service';
import {LogingService} from '../services/loging.service';

@Component({
  selector: 'app-bucket-user',
  templateUrl: './bucket-user.component.html',
  styleUrls: ['./bucket-user.component.css']
})
export class BucketUserComponent implements OnInit, DoCheck {
  private products: ProductDataAmount[] = [];
  private totalValueProducts = 0;
  private totalAmountProducts = 0;
  private isAuthenticated = false;

  constructor(private bucketService: BucketService,
              private router: Router,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.logingServiece.isAuthenticated();
    if (this.isAuthenticated) {
      this.getDataFromDatabase();
    } else {
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
          this.products.push(bucketProduct);
        }
      }
    }

    this.bucketService.buyAllProduct.subscribe(
      (respone) => {
        this.products = [];
        localStorage.setItem('bucket123', null);
      }
    );

  }

  ngDoCheck() {
    this.isAuthenticated = this.logingServiece.isAuthenticated();
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      const value = prod.price * prod.totalAmount;
      this.products[i].value = value;
      this.calcuateTotalValueProducts();
      this.calculateTotalAmountProduct();
    }
    this.saveTempDataToLocalStorage();
  }

  saveTempDataToLocalStorage() {
    const bucketToSave = JSON.stringify(this.products);
    localStorage.setItem('bucket123', null);
    localStorage.setItem('bucket123', bucketToSave);
  }

  calcuateTotalValueProducts() {
    this.totalValueProducts = 0;
    for (const product of this.products) {
      const valueTemp = Number(product.value) | 0;
      this.totalValueProducts += valueTemp;
    }
  }

  onAddAmountProcuct(bucketProduct: ProductDataAmount) {
    if (bucketProduct.totalAmount < 3) {
      if (this.isAuthenticated) {
        this.bucketServerService.addProductToCard(bucketProduct.id).subscribe(
          (resposne) => {
            if (resposne === true) {
              alert('successfully added product to bucket');
              this.adding(bucketProduct);
            } else {
              alert('something go wrong contact with our service');
            }
          }
        );
      } else {
        this.adding(bucketProduct);
      }
    }
  }

  adding(bucketProduct: ProductDataAmount) {
    const index = this.products.indexOf(this.products.find(x => x.id === bucketProduct.id));
    bucketProduct.totalAmount++;
    this.products[index] = bucketProduct;
  }

  onSubtractAmountProduct(bucketProduct: ProductDataAmount) {
    if (bucketProduct.totalAmount === 1) {
      this.onRemove(bucketProduct);
    }

    if (bucketProduct.totalAmount > 1) {
      if (this.isAuthenticated) {
        this.bucketServerService.removeSingleItemToBucket(bucketProduct.id).subscribe(
          (resposne) => {
            if (resposne === true) {
              alert('succesfully removed product from bucket');
              this.subtracting(bucketProduct);
            } else {
              alert('something go wrong contact with our service');
            }
          });
      } else {
        this.subtracting(bucketProduct);
      }
    }
  }

  onRemove(product: ProductDataAmount) {
    if (this.isAuthenticated) {
      this.bucketServerService.removeSingleProductFromBucket(product.id).subscribe(
        (respones) => {
          this.removing(product);
        },
        (error) => console.log(error)
      );
    } else {
      this.removing(product);
    }
  }

  subtracting(bucketProduct: ProductDataAmount) {
    const index = this.products.indexOf(this.products.find(x => x.id === bucketProduct.id));
    bucketProduct.totalAmount--;
    this.products[index] = bucketProduct;
  }


  calculateTotalAmountProduct() {
    this.totalAmountProducts = 0;
    for (const prduct of this.products) {
      const amountTemp = Number(prduct.totalAmount) | 0;
      this.totalAmountProducts += amountTemp;
    }
    this.bucketService.bucketStatus.emit(this.totalAmountProducts.toString());
  }


  removing(product: ProductDataAmount) {
    const found = this.products.find(x => x.id === product.id);
    const index = this.products.indexOf(found);
    this.products.splice(index, 1);
  }

  onNext() {
    this.router.navigate(['/summary']);
  }

  getDataFromDatabase() {
    this.bucketServerService.getProductListFromDatabase().subscribe(
      (products: any[]) => {
        if (!isNull(products)) {
          for (let i = 0; i < products.length; i++) {
            const bucketProduct: ProductDataAmount = new ProductDataAmount(
              products[i].productDto.id,
              products[i].productDto.price,
              products[i].productDto.title,
              products[i].productDto.description,
              products[i].productDto.imageLink,
              products[i].amount,
              null,
              null
            );
            this.products.push(bucketProduct);
          }
        }
      }
    );
  }
}
