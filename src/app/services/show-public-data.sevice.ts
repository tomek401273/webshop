import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import {DirectoryTitles} from '../model/directory-titles';
import {ReminderDto} from '../model/dto/reminder-dto';


@Injectable()
export class ShowPublicDataSevice {
  private productsTitle: String[] = [];
  productTitleEmitter = new EventEmitter<DirectoryTitles>();
  mavPriceEmitter = new EventEmitter<number>();
  private directoryTitles = new DirectoryTitles(null);
  private maxPrice: number;

  constructor(private httpClient: HttpClient) {
  }

  getProducts() {
    return this.httpClient.get('http://localhost:8080/product/all');
  }

  getProductsToEdit() {
    return this.httpClient.get('http://localhost:8080/product/getAllProductToEdit');
  }

  getProduct(id: number) {
    const url: string = 'http://localhost:8080/product/' + id;
    return this.httpClient.get(url);
  }

  checkAvailable(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const idSting = String(id);
    const params = {id: idSting};
    return this.httpClient.get('http://localhost:8080/product/available',
      {
        headers: headers,
        params: params
      });
  }

  searchProductInDatabase(title) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const params = {title: title};

    return this.httpClient.get('http://localhost:8080/product/searchProduct', {
      headers: headers,
      params: params
    });
  }

  filterProductWithPriceBetween(above, below) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const filterPrice = {
      'above': above,
      'below': below
    };

    return this.httpClient.get('http://localhost:8080/product/filterPrice', {
      headers: headers,
      params: filterPrice
    });
  }


  getAllProductsTitleFromDatabase() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.get('http://localhost:8080/product/getAllProductsTitle', {
      headers: headers
    }).subscribe(
      (titles: String[]) => {
        this.directoryTitles.titles = titles;
        this.productTitleEmitter.emit(this.directoryTitles);
      },
      (error) => console.log(error)
    );
  }

  getProductTitles() {
    return this.directoryTitles.titles;
  }

  setReminder(reminderDto: ReminderDto) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.post('http://localhost:8080/product/setReminder', reminderDto, {
      headers: headers
    });
  }

  getMaxProductPrice() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.get('http://localhost:8080/product/maxprice', {
      headers: headers
    }).subscribe(
      (response: number) => {
        this.maxPrice = response;
        this.mavPriceEmitter.emit(this.maxPrice);
      },
      (error) => console.log(error)
    );
  }

  getMaxPrice() {
    return this.maxPrice;
  }

  subscribeNewsletter(name: String, email: String) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const subscriber = {name: name, email: email};

    return this.httpClient.post('http://localhost:8080/newsletter/subscribe', subscriber, {
      headers: headers
    });
  }

  getCategoryNames() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    return this.httpClient.get('http://localhost:8080/category/all', {
      headers: headers
    });
  }

  getProductWithCategory(category: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    const params = {category: category};
    return this.httpClient.get('http://localhost:8080/category/product', {
      headers: headers,
      params
    });
  }


}
