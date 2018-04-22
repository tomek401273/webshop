import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Log} from '../model/Log';
import {ServerService} from './server.service';
import {Router} from '@angular/router';
import {Register} from '../model/register';
import {Server} from '../model/server';

@Injectable()
export class LogingService {

  constructor(private httpClient: HttpClient,
              private serverService: ServerService,
              private router: Router) {
  }

  loginSuccessful = new EventEmitter<String>();
  logoutEmitter = new EventEmitter<boolean>();

  getToken(log: Log) {
    return this.httpClient.post(Server.address + 'login', log,
      {
        observe: 'response',
        responseType: 'text',
      });
  }

  logOut() {
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
    localStorage.setItem('login', null);
    localStorage.setItem('bucket123', null);
    this.logoutEmitter.emit(true);
  }

  isAuthenticated() {
    if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'admin, user') {
      return true;
    } else {
      return false;
    }
  }

  isAuthentication() {
    const promise = new Promise(
      (resolve => {
        resolve(this.isAuthenticated());
      })
    );
    return promise;
  }

  registration(register: Register) {
    return this.httpClient.post(Server.address + 'auth/signup', register, {
      observe: 'response',
      responseType: 'text',
    });
  }

  checkLoginAvailable(login) {
    const params = {login: login};
    return this.httpClient.get(Server.address + 'auth/checkLoginAvailable', {
      observe: 'response',
      responseType: 'text',
      params: params
    });
  }
}
