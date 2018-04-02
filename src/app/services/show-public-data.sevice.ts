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
    const filterPrice = {
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

  // getMaxProductPrice() {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .append('Accept', 'application/json');
  //   return this.httpClient.get('http://localhost:8080/product/maxprice', {
  //     headers: headers
  //   });
  // }
}
