import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Log} from "../auth/signin/Log";

@Injectable()
export class LoggingService {
  // model = {password: '$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK', login: 'tomek'};
  model = {password: '$2a$10$KEAhNEMjlM9TXmyTNCYE1.v/tFp4ie5kJAibRCv91DkjMJhYpkFh6', login: 'tomek2'};

  constructor(private httpClient: HttpClient) {}

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

  getToken(log: Log) {
    console.log(log);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post('http://localhost:8080/login', log,
      {
        observe: 'response',
        responseType: 'text',
        headers: headers
      });

  }

}
