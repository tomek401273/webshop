import {Component, OnInit, ViewChild} from '@angular/core';
import {LogingService} from './services/loging.service';
import {ShowPublicDataSevice} from './services/show-public-data.sevice';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('info') private _info: SwalComponent;
  private loggingTimeout;

  constructor(private logingService: LogingService,
              private showPublicDataService: ShowPublicDataSevice) {
    this.controlActiveSession();
    this.showPublicDataService.getAllProductsTitleFromDatabase();
    this.showPublicDataService.getMaxProductPrice();
    this.showPublicDataService.downloadApprovedCountry();
  }

  ngOnInit() {
    this.logingService.loginSuccessful
      .subscribe(
        () => {
          this.controlActiveSession();
        }
      );

    this.logingService.logoutEmitter.subscribe(
      (logout: boolean) => {
        if (logout) {
          clearTimeout(this.loggingTimeout);
        }
      }
    );
  }

  get info(): SwalComponent {
    return this._info;
  }

  set info(value: SwalComponent) {
    this._info = value;
  }

  controlActiveSession() {
    const currentDate = new Date().getTime();
    const expiredToken: number = Number(localStorage.getItem('expiredToken'));
    const remainToken = expiredToken - currentDate;

    if (expiredToken > currentDate) {
      this.loggingTimeout = setTimeout(() => {
        if (this.logingService.isAuthenticated()) {
          this._info.show();
          this.logingService.logOut();
        }
      }, remainToken);
    } else {
      this.logingService.logOut();
    }
  }
}
