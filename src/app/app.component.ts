import {Component, OnInit} from '@angular/core';
import {LogingService} from './services/loging.service';
import {ShowPublicDataSevice} from './services/show-public-data.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private logingService: LogingService,
              private showPublicDataService: ShowPublicDataSevice) {
    this.showPublicDataService.getAllProductsTitleFromDatabase();

  }

  ngOnInit() {
    this.logingService.loginSuccessful
      .subscribe(
        (response) => {
          setTimeout(() => {
            if (this.logingService.isAuthenticated()) {
              alert('Your session ares gone. Log in once again');
              this.logingService.logOut();
            }
          }, 1200000);
        }
      );
  }

}
