import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Log} from '../model/Log';
import {ServerService} from './server.service';
import {Router} from '@angular/router';
import {Register} from '../model/register';

@Injectable()
export class LogingService {

  constructor(private httpClient: HttpClient,
              private serverService: ServerService,
              private router: Router) {
  }

  loginSuccessful = new EventEmitter<String>();
  logoutEmitter = new EventEmitter<boolean>();

  getToken(log: Log) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post('http://localhost:8080/login', log,
      {
        observe: 'response',
        responseType: 'text',
        headers: headers
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
    }
    else {
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
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');

    return this.httpClient.post('http://localhost:8080/auth/signup', register, {
      observe: 'response',
      responseType: 'text',
      headers: headers,
    });
  }

  checkLoginAvailable(login) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');
    console.log('serviced');
    console.log(login);
    return this.httpClient.post('http://localhost:8080/auth/checkLoginAvailable', login, {
      observe: 'response',
      responseType: 'text',
      headers: headers
    });
  }
}
