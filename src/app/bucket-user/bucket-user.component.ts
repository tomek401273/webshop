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
  private totalValueProducts: number = 0;
  private totalAmountProducts: number = 0;
  private isAuthenticated = false;

  constructor(private bucketService: BucketService,
              private router: Router,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService) {
  }

  ngOnInit() {
    let bucket = JSON.parse(localStorage.getItem('bucket123'));
    console.log(bucket);
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        let bucketProduct: ProductDataAmount = new ProductDataAmount(
          bucket[i]._id,
          bucket[i]._price,
          bucket[i]._title,
          bucket[i]._description,
          bucket[i]._imageLink,
          bucket[i]._amount);
        this.products.push(bucketProduct);
      }
    }
  }

  ngDoCheck() {
    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      let value = prod.price * prod.amount;
      this.products[i].value = value;
      this.calcuateTotalValueProducts();
      this.calculateTotalAmountProduct();
    }
    this.saveTempDataToLocalStorage();
  }

  saveTempDataToLocalStorage() {
    let bucketToSave = JSON.stringify(this.products);
    localStorage.setItem('bucket123', null);
    localStorage.setItem('bucket123', bucketToSave);
    this.isAuthenticated = this.logingServiece.isAuthenticated();
  }

  calcuateTotalValueProducts() {
    this.totalValueProducts = 0;
    for (let product of this.products) {
      let valueTemp = Number(product.value) | 0;
      this.totalValueProducts += valueTemp;
    }
  }

  onAddAmountProcuct(bucketProduct: ProductDataAmount) {
    if (bucketProduct.amount < 3) {
      if (this.isAuthenticated) {
        this.bucketServerService.addProductToCard(bucketProduct.id).subscribe(
          (resposne) => {
            if (resposne === true) {
              alert('successfully added product to bucket');
              this.adding(bucketProduct)
            } else {
              alert('something go wrong contact with our service');
              console.log(resposne);
            }
          }
        );
      } else {
        this.adding(bucketProduct)
      }
    }
  }

  adding(bucketProduct: ProductDataAmount) {
    let index = this.products.indexOf(this.products.find(x => x.id === bucketProduct.id));
    bucketProduct.amount++;
    this.products[index] = bucketProduct;
  }

  onSubtractAmountProduct(bucketProduct: ProductDataAmount) {
    if (bucketProduct.amount > 0) {
      if (this.isAuthenticated) {
        this.bucketServerService.removeSingleItemToBucket(bucketProduct.id).subscribe(
          (resposne) => {
            if (resposne === true) {
              alert('succesfully removed product from bucket');
              this.subtracting(bucketProduct)
            } else {
              alert('something go wrong contact with our service');
              console.log(resposne);
            }
          });
      } else {
        this.subtracting(bucketProduct);
      }
    }
  }

  subtracting(bucketProduct: ProductDataAmount) {
    let index = this.products.indexOf(this.products.find(x => x.id === bucketProduct.id));
    bucketProduct.amount--;
    this.products[index] = bucketProduct;
  }


  calculateTotalAmountProduct() {
    this.totalAmountProducts = 0;
    for (let prduct of this.products) {
      let amountTemp = Number(prduct.amount) | 0;
      this.totalAmountProducts += amountTemp;
    }
    this.bucketService.bucketStatus.emit(this.totalAmountProducts.toString());
  }

  onRemove(product: ProductDataAmount) {
    if (this.isAuthenticated) {
      this.bucketServerService.removeSingleProductFromBucket(product.id).subscribe(
        (respones) => {
          this.removing(product);
        },
        (error) => console.log(error)
      )
    } else {
      this.removing(product);
    }
  }

  removing(product: ProductDataAmount) {
    let found = this.products.find(x => x.id === product.id);
    let index = this.products.indexOf(found);
    this.products.splice(index, 1);
  }


  onRemoveAllProducts() {
    this.bucketServerService.removeAllProductFromBucket().subscribe(
      (respone) => {
        this.products = [];
        localStorage.setItem('bucket123', null);
      },
      (error) => console.log(error)
    );
  }

  onNext() {
    this.router.navigate(['/summary']);
  }
}
