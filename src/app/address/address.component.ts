import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Address} from '../model/address';
import {ShowPublicDataSevice} from '../services/show-public-data.sevice';
import {isNull} from 'util';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  private _restrictedCity: string[] = this.publicServer.getApproveCountry();
  @Output() userAddress = new EventEmitter<string>();
  @Output() permissionToSubmit = new EventEmitter<boolean>();
  private _userSettings = {
    inputPlaceholderText: 'Search your delivery location',
    'geoTypes': ['(regions)', 'establishment', 'geocode'],
    'geoCountryRestriction': this._restrictedCity,
    'showCurrentLocation': false
  };

  private _addressInput = false;
  private _insertAddress = '';
  private _validatedAddress: Address = new Address(null, null, null, null, null, null, null, null, null);
  @ViewChild('error') private _buyError: SwalComponent;
  private _attemptInput = false;

  autoCompleteCallback1(selectedData: any) {
    this._attemptInput = true;
    if (selectedData.response === true) {
      this._insertAddress = selectedData.data.formatted_address;
      this.checkAddress();
    } else {
      this._addressInput = false;
      this._insertAddress = '';
      this._validatedAddress = new Address(null, null, null, null, null, null, null, null, null);
      this.permissionToSubmit.emit(this._addressInput);
    }
  }

  constructor(private publicServer: ShowPublicDataSevice) {
  }

  ngOnInit() {
  }

  checkAddress() {

    if (this._insertAddress.length > 5) {
      this.publicServer.confirmAddress(this._insertAddress).subscribe(
        (response: Address) => {
          if (isNull(response)) {
            this.incorrectAddress();
          } else {
            this._addressInput = true;
            this._validatedAddress = response;
            this.userAddress.emit(response.label);
            this.permissionToSubmit.emit(this._addressInput);
          }
        },
        () => {
          this.incorrectAddress();
        }
      );
    } else {
      this._addressInput = false;
      this.permissionToSubmit.emit(this._addressInput);
    }

  }

  incorrectAddress() {
    this._addressInput = false;
    this._insertAddress = '';
    this._buyError.show();
    this.permissionToSubmit.emit(this._addressInput);
  }

  get restrictedCity(): string[] {
    return this._restrictedCity;
  }

  set restrictedCity(value: string[]) {
    this._restrictedCity = value;
  }

  get userSettings(): { inputPlaceholderText: string; geoCountryRestriction: string[]; showCurrentLocation: boolean; geoTypes: string[] } {
    return this._userSettings;
  }

  set userSettings(value: { inputPlaceholderText: string; geoCountryRestriction: string[]; showCurrentLocation: boolean; geoTypes: string[] }) {
    this._userSettings = value;
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

  get buyError(): SwalComponent {
    return this._buyError;
  }

  set buyError(value: SwalComponent) {
    this._buyError = value;
  }

  get attemptInput(): boolean {
    return this._attemptInput;
  }

  set attemptInput(value: boolean) {
    this._attemptInput = value;
  }
}
