import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Log} from "./signin/Log";
import {ServerService} from "../services/server.service";

@Injectable()
export class LogingService {

  constructor(private httpClient: HttpClient,private serverService: ServerService) {}

  // getToken(log: Log) {
  //   console.log(log);
  //
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //
  //   return this.httpClient.post('http://localhost:8080/login', log,
  //     {
  //       observe: 'response',
  //       responseType: 'text',
  //       headers: headers
  //     })
  //     .subscribe(
  //       (response: HttpResponse<String>) => {
  //         // console.log(response.headers.get("Authorization"));
  //         let token= response.headers.get("Authorization");
  //         localStorage.setItem("token",token);
  //
  //         // console.log("Credentials: ");
  //         // console.log(response.headers.get("CREDENTIALS"))
  //         console.log(localStorage.getItem("token"));
  //       }
  //     );
  //
  // }

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



}
