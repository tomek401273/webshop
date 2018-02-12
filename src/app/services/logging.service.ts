import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class LoggingService {
  model = {password: '$2a$10$ee/Qv.MHjREpOYTq8ZKO5uXcFft4xrrL.q6V1Gb0Les.6Blt5cRCK', login: 'tomek'};

  constructor(private httpClient: HttpClient) {}

  getToken() {
    // const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    //   .append('Content-Type', 'application/json')
    //   .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    //   .append('Access-Control-Allow-Headers', 'Content-Type');

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post('http://localhost:8080/login', this.model,
      {
        // observe: 'response',
        // responseType: 'json',
        headers: headers
      })
      .subscribe(
        (response: Response) => {
          console.log(response)
        }
      );

    // .map(
    //   (response: Response) => {
    //     console.log(response.headers);
    //     return response;
    //   }
    // )
  }



}
