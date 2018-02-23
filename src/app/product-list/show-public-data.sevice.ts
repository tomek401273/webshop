import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ShowPublicDataSevice {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get('http://localhost:8080/product/all')
  }

  getProduct(id: number) {
    return this.httpClient.get('http://localhost:8080/product/'+id)
  }


}
