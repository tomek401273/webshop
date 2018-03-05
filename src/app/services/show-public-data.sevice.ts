import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class ShowPublicDataSevice {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get('http://localhost:8080/product/all')
  }

  getProduct(id: number) {
    let url: string ='http://localhost:8080/product/'+id;
    return this.httpClient.get(url)
  }

  checkAvailable(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .append('Accept','application/json');
    return this.httpClient.put('http://localhost:8080/product/available', id,
      {
      headers: headers
      })
  }
}
