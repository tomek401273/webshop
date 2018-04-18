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
  @ViewChild('info') info: SwalComponent;
  constructor(private logingService: LogingService,
              private showPublicDataService: ShowPublicDataSevice) {
    this.showPublicDataService.getAllProductsTitleFromDatabase();
    this.showPublicDataService.getMaxProductPrice();
    this.showPublicDataService.downloadApprovedCountry();

  }

  ngOnInit() {
    this.logingService.loginSuccessful
      .subscribe(
        (response) => {
          setTimeout(() => {
            if (this.logingService.isAuthenticated()) {
              this.info.show();
              this.logingService.logOut();
            }
          }, 1200000);
        }
      );
  }

}
