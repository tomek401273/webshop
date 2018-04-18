import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {ShippingAddress} from '../../model/shipping-address';
import {BucketService} from '../bucket.service';
import {BucketServerService} from '../bucket-server.service';
import {isNull} from 'util';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {Address} from '../../model/address';
import {NgForm} from '@angular/forms';
import {SweetAlert2Module, SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  suppliers = [{'name': 'InPost', 'price': 10}, {'name': 'DHL', 'price': '23'}];
  private id: number;
  private userAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private userAddressBackUp: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  restrictedCity: string[] = this.publicServer.getApproveCountry();
  validAddress = false;
  addressInput = false;
  insertAddress = '';
  validatedAddress: Address = new Address(null, null, null, null, null, null, null, null, null);
  useAnotherAddress = false;
  enableSubmit = false;
  @ViewChild('f') signupForm: NgForm;
  @ViewChild('confirmBuy') confirmBuy: SwalComponent;
  @ViewChild('buySuccess') buySuccess: SwalComponent;
  @ViewChild('buyError') buyError: SwalComponent;


  userSettings = {
    inputPlaceholderText: 'Search your delivery location',
    'geoCountryRestriction': this.restrictedCity,
    'showCurrentLocation': false,
    'geoTypes': ['(regions)', 'establishment', 'geocode']
  };


  autoCompleteCallback1(selectedData: any) {
    this.insertAddress = selectedData.data.formatted_address;
    console.log(selectedData.data);
  }

  constructor(private router: Router,
              private orderService: OrdersService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private publicServer: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.bucketServerService.getAddressShippment().subscribe(
      (response: ShippingAddress) => {
        console.log(response);
        this.userAddress = response;
        console.log(this.userAddress);
        this.userAddressBackUp = response;
      },
      (error) => {
        this.buyError.show();
      }
    );
  }

  onConfirm() {
    const shippingAddress: ShippingAddress = new ShippingAddress(
      localStorage.getItem('login'),
      this.userAddress.country,
      this.userAddress.city,
      this.userAddress.postalCode,
      this.userAddress.street,
      this.userAddress.name,
      this.userAddress.surname,
      this.signupForm.value.supplierS
    );
    shippingAddress.code = localStorage.getItem('coupon');

    if (this.useAnotherAddress) {
      shippingAddress.search = this.insertAddress;
    } else {
      shippingAddress.search = this.userAddress.street + ', ' + this.userAddress.city + ', ' + this.userAddress.country;
    }
    this.orderService.buyAllProductFromBucket(shippingAddress).subscribe(
      (response: number) => {
        if (!isNull(response)) {
          this.id = response;
          this.bucketService.buyAllProduct.emit(true);
          this.router.navigate(['/success/' + this.id]);
          this.buySuccess.show();
        } else {
          this.buyError.show();
        }
      },
      (error) => {
        this.buyError.show();
      }
    );
  }


  onSubmit() {
    this.confirmBuy.show();
  }

  checkAddress() {
    this.addressInput = true;

    if (this.insertAddress.length > 5) {
      this.publicServer.confirmAddress(this.insertAddress).subscribe(
        (response: Address) => {
          if (isNull(response)) {
            this.validAddress = false;
            this.insertAddress = '';
            this.buyError.show();
          } else {
            this.validatedAddress = response;
            this.validAddress = true;
          }
        },
        (error) => {
          this.validAddress = false;
          this.insertAddress = '';
          this.buyError.show();
        }
      );
    } else {
      this.enableSubmit = false;
    }
  }
}
