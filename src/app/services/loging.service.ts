import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Log} from '../model/log';
import {Register} from '../model/register';
import {Server} from '../model/server';
import {ChangePassword} from '../model/change-password';
import {RegisterMapper} from '../model/dto/register-mapper';
import {RegisterDto} from '../model/dto/register-dto';

@Injectable()
export class LogingService {

  constructor(private httpClient: HttpClient) {
  }

  loginSuccessful = new EventEmitter<String>();
  logoutEmitter = new EventEmitter<boolean>();
  private registerMapper: RegisterMapper = new RegisterMapper();

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
    const registerDto: RegisterDto = this.registerMapper.mapToRegisterDto(register);
    return this.httpClient.post(Server.address + 'auth/signup', registerDto, {
      observe: 'response',
      responseType: 'text',
    });
  }

  updateAccount(register: Register) {
    const registerDto: RegisterDto = this.registerMapper.mapToRegisterDto(register);
    return this.httpClient.put(Server.address + 'auth/update/account', registerDto, {
      observe: 'response',
      responseType: 'text',
    });
  }

  changePassword(changePassword: ChangePassword) {
    return this.httpClient.put(Server.address + 'auth/update/password', changePassword, {
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
