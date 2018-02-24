import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Log} from "./signin/Log";
import {ServerService} from "../services/server.service";
import {Router} from "@angular/router";
import {Register} from "./register";

@Injectable()
export class LogingService {

  constructor(private httpClient: HttpClient,
              private serverService: ServerService,
              private router: Router) {
  }

  loginSuccessful = new EventEmitter<String>();

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
    localStorage.setItem("token", null);
    localStorage.setItem("role", null);
  }

  isAuthenticated() {
    if (localStorage.getItem("role") === "user" || localStorage.getItem("role") === "admin") {
      return true;
    }
    else {
      return false
    }
  }

  isAuthentication() {
    const promise = new Promise(
      (resolve => {
        resolve(this.isAuthenticated())
      })
    )
    return promise;
  }


  registration(register: Register) {
    console.log(register);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Accept','application/json');
    return this.httpClient.post('http://localhost:8080/auth/signup', register, {
      observe: 'response',
      responseType: 'text',
      headers: headers,
    })
  }

}
