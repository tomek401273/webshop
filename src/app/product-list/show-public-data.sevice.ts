import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ShowPublicDataSevice {
  constructor(private httpClient: HttpClient) {}

  getProduct() {
    return this.httpClient.get('http://localhost:8080/product/all')
      // .subscribe(
      //   (products: any[]) => console.log(products),
      //   (error) => console.log(error)
      // );
  }
}
