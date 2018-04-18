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
  private approvedCountry: string[] = [];

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
    const idSting = String(id);
    const params = {id: idSting};
    return this.httpClient.get('http://localhost:8080/product/available', {
      params: params
    });
  }

  searchProductInDatabase(title) {
    const params = {title: title};
    return this.httpClient.get('http://localhost:8080/product/searchProduct', {
      params: params
    });
  }

  filterProductWithPriceBetween(above, below) {
    const filterPrice = {
      'above': above,
      'below': below
    };
    return this.httpClient.get('http://localhost:8080/product/filterPrice', {
      params: filterPrice
    });
  }

  getAllProductsTitleFromDatabase() {
    return this.httpClient.get('http://localhost:8080/product/getAllProductsTitle').subscribe(
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
    return this.httpClient.post('http://localhost:8080/product/setReminder', reminderDto);
  }

  getMaxProductPrice() {
    return this.httpClient.get('http://localhost:8080/product/maxprice').subscribe(
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
    const subscriber = {name: name, email: email};
    return this.httpClient.post('http://localhost:8080/newsletter/subscribe', subscriber);
  }

  getCategoryNames() {
    return this.httpClient.get('http://localhost:8080/category/all');
  }

  getProductWithCategory(category: string) {
    const params = {category: category};
    return this.httpClient.get('http://localhost:8080/category/product', {
      params
    });
  }

  confirmNewsletterEmail(email: string, confirmCode: string) {
    const confirmDto = {email: email, confirmCode: confirmCode};
    return this.httpClient.post('http://localhost:8080/newsletter/confirm', confirmDto
    );
  }

  confirmAccount(email: string, confirmCode: string) {
    const confirmDto = {email: email, confirmCode: confirmCode};
    return this.httpClient.post('http://localhost:8080/auth/account/confirm', confirmDto);
  }

  downloadApprovedCountry() {
    return this.httpClient.get('http://localhost:8080/location/country/approved').subscribe(
      (response: string[]) => {
        this.approvedCountry = response;
      },
      (error) => console.log(error)
    );
  }

  getApproveCountry() {
    return this.approvedCountry;
  }

  confirmAddress(address: string) {
    const params = {search: address};

    return this.httpClient.get('http://localhost:8080/location/check', {
      params: params
    });
  }

}
