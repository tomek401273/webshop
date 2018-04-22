import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {ShippingAddress} from '../../model/shipping-address';
import {BucketService} from '../../services/bucket.service';
import {BucketServerService} from '../../services/bucket-server.service';
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
  private _suppliers = [{'name': 'InPost', 'price': 10}, {'name': 'DHL', 'price': '23'}];
  private _id: number;
  private _userAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private _userAddressBackUp: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private _restrictedCity: string[] = this.publicServer.getApproveCountry();
  private _validAddress = false;
  private _addressInput = false;
  private _insertAddress = '';
  private _validatedAddress: Address = new Address(null, null, null, null, null, null, null, null, null);
  private _useAnotherAddress = false;
  private _enableSubmit = false;
  @ViewChild('f') private _signupForm: NgForm;
  @ViewChild('_confirmBuy') private _confirmBuy: SwalComponent;
  @ViewChild('_buySuccess') private _buySuccess: SwalComponent;
  @ViewChild('_buyError') private _buyError: SwalComponent;

  private _userSettings = {
    inputPlaceholderText: 'Search your delivery location',
    'geoCountryRestriction': this._restrictedCity,
    'showCurrentLocation': false,
    'geoTypes': ['(regions)', 'establishment', 'geocode']
  };

  autoCompleteCallback1(selectedData: any) {
    this._insertAddress = selectedData.data.formatted_address;
    console.log(selectedData.data);
  }

  constructor(private router: Router,
              private orderService: OrdersService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private publicServer: ShowPublicDataSevice) {
  }

  get suppliers(): ({ name: string; price: number } | { name: string; price: string })[] {
    return this._suppliers;
  }

  set suppliers(value: ({ name: string; price: number } | { name: string; price: string })[]) {
    this._suppliers = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userAddress(): ShippingAddress {
    return this._userAddress;
  }

  set userAddress(value: ShippingAddress) {
    this._userAddress = value;
  }

  get userAddressBackUp(): ShippingAddress {
    return this._userAddressBackUp;
  }

  set userAddressBackUp(value: ShippingAddress) {
    this._userAddressBackUp = value;
  }

  get restrictedCity(): string[] {
    return this._restrictedCity;
  }

  set restrictedCity(value: string[]) {
    this._restrictedCity = value;
  }

  get validAddress(): boolean {
    return this._validAddress;
  }

  set validAddress(value: boolean) {
    this._validAddress = value;
  }

  get addressInput(): boolean {
    return this._addressInput;
  }

  set addressInput(value: boolean) {
    this._addressInput = value;
  }

  get insertAddress(): string {
    return this._insertAddress;
  }

  set insertAddress(value: string) {
    this._insertAddress = value;
  }

  get validatedAddress(): Address {
    return this._validatedAddress;
  }

  set validatedAddress(value: Address) {
    this._validatedAddress = value;
  }

  get useAnotherAddress(): boolean {
    return this._useAnotherAddress;
  }

  set useAnotherAddress(value: boolean) {
    this._useAnotherAddress = value;
  }

  get enableSubmit(): boolean {
    return this._enableSubmit;
  }

  set enableSubmit(value: boolean) {
    this._enableSubmit = value;
  }

  get signupForm(): NgForm {
    return this._signupForm;
  }

  set signupForm(value: NgForm) {
    this._signupForm = value;
  }

  get confirmBuy(): SwalComponent {
    return this._confirmBuy;
  }

  set confirmBuy(value: SwalComponent) {
    this._confirmBuy = value;
  }

  get buySuccess(): SwalComponent {
    return this._buySuccess;
  }

  set buySuccess(value: SwalComponent) {
    this._buySuccess = value;
  }

  get buyError(): SwalComponent {
    return this._buyError;
  }

  set buyError(value: SwalComponent) {
    this._buyError = value;
  }

  get userSettings(): { inputPlaceholderText: string; geoCountryRestriction: string[]; showCurrentLocation: boolean; geoTypes: string[] } {
    return this._userSettings;
  }

  set userSettings(value: { inputPlaceholderText: string; geoCountryRestriction: string[]; showCurrentLocation: boolean; geoTypes: string[] }) {
    this._userSettings = value;
  }

  ngOnInit() {
    this.bucketServerService.getAddressShippment().subscribe(
      (response: ShippingAddress) => {
        console.log(response);
        this._userAddress = response;
        console.log(this._userAddress);
        this._userAddressBackUp = response;
      },
      (error) => {
        this._buyError.show();
      }
    );
  }

  onConfirm() {
    const shippingAddress: ShippingAddress = new ShippingAddress(
      localStorage.getItem('login'),
      this._userAddress.country,
      this._userAddress.city,
      this._userAddress.postalCode,
      this._userAddress.street,
      this._userAddress.name,
      this._userAddress.surname,
      this._signupForm.value.supplierS
    );
    shippingAddress.code = localStorage.getItem('coupon');

    if (this._useAnotherAddress) {
      shippingAddress.search = this._insertAddress;
    } else {
      shippingAddress.search = this._userAddress.street + ', ' + this._userAddress.city + ', ' + this._userAddress.country;
    }
    this.orderService.buyAllProductFromBucket(shippingAddress).subscribe(
      (response: number) => {
        if (!isNull(response)) {
          this._id = response;
          this.bucketService.buyAllProduct.emit(true);
          this.router.navigate(['/success/' + this._id]);
          this._buySuccess.show();
        } else {
          this._buyError.show();
        }
      },
      (error) => {
        this._buyError.show();
      }
    );
  }


  onSubmit() {
    this._confirmBuy.show();
  }

  checkAddress() {
    this._addressInput = true;

    if (this._insertAddress.length > 5) {
      this.publicServer.confirmAddress(this._insertAddress).subscribe(
        (response: Address) => {
          if (isNull(response)) {
            this._validAddress = false;
            this._insertAddress = '';
            this._buyError.show();
          } else {
            this._validatedAddress = response;
            this._validAddress = true;
          }
        },
        (error) => {
          this._validAddress = false;
          this._insertAddress = '';
          this._buyError.show();
        }
      );
    } else {
      this._enableSubmit = false;
    }
  }
}
