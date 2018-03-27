import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class ShowPublicDataSevice {
  private productsTitle: String[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getProducts() {
    return this.httpClient.get('http://localhost:8080/product/all');
  }

  getProduct(id: number) {
    let url: string = 'http://localhost:8080/product/' + id;
    return this.httpClient.get(url);
  }

  checkAvailable(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.put('http://localhost:8080/product/available', id,
      {
        headers: headers
      });
  }

  searchProductInDatabase(title) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.post('http://localhost:8080/product/searchProduct', title, {
      headers: headers
    });
  }

  filterProductWithPriceBetween(above, below) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    let filterPrice = {
      'above': above,
      'below': below
    };

    return this.httpClient.post('http://localhost:8080/product/filterPrice', filterPrice, {
      headers: headers
    });
  }

  getAllProductsTitleFromDatabase() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.get('http://localhost:8080/product/getAllProductsTitle', {
      headers: headers
    }).subscribe(
      (titles: any[]) => {
        this.productsTitle = titles;
      },
      (error) => console.log(error)
    );
  }

  getProductsTitles() {
    return this.productsTitle;
  }

}
