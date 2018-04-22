import {Component, DoCheck, OnInit} from '@angular/core';
import {LogingService} from '../services/loging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, DoCheck {
  private _isAuthenticated = false;
  private _loginUser = '';
  private _roleUser = '';

  constructor(private _logginService: LogingService,
              private _router: Router) {
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get loginUser(): string {
    return this._loginUser;
  }

  set loginUser(value: string) {
    this._loginUser = value;
  }

  get roleUser(): string {
    return this._roleUser;
  }

  set roleUser(value: string) {
    this._roleUser = value;
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this._isAuthenticated = this._logginService.isAuthenticated();
    this._loginUser = localStorage.getItem('login');
    this._roleUser = localStorage.getItem('role');
  }

  onRedirect(page) {
    this._router.navigate([page]);
  }

  onLogOut() {
    this._logginService.logOut();
  }

}


