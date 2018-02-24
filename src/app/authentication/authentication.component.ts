import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {Log} from "../auth/signin/Log";
import {LogingService} from "../auth/loging.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, DoCheck {
  private isAuthenticated = false;
  constructor(private logginService: LogingService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.isAuthenticated = this.logginService.isAuthenticated();
  }

  onRedirect(page){
    this.router.navigate([page])
  }
  onLogOut(){
    this.logginService.logOut();
  }

}


