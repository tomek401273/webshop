import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DirectoryTitles} from '../model/directory-titles';
import {ReminderDto} from '../model/dto/reminder-dto';
import {Server} from '../model/server';
import {Router} from '@angular/router';


@Injectable()
export class ShowPublicDataSevice {
  productTitleEmitter = new EventEmitter<DirectoryTitles>();
  mavPriceEmitter = new EventEmitter<number>();
  private directoryTitles = new DirectoryTitles();
  private maxPrice: number;
  private approvedCountry: string[] = [];

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  category = new EventEmitter<string>();
  searchedProduct = new EventEmitter<string>();

  redirectToBegin(category: String) {
    this.router.navigate(['/']);
  }

  getProducts() {
    return this.httpClient.get(Server.address + 'product/all');
  }

  getProductsToEdit() {
    return this.httpClient.get(Server.address + 'product/getAllProductToEdit');
  }

  getProduct(id: number) {
    const url: string = Server.address + 'product/' + id;
    return this.httpClient.get(url);
  }

  checkAvailable(id: number) {
    const idSting = String(id);
    const params = {id: idSting};
    return this.httpClient.get(Server.address + 'product/available', {
      params: params
    });
  }

  searchProductInDatabase(title) {
    const params = {title: title};
    return this.httpClient.get(Server.address + 'product/searchProduct', {
      params: params
    });
  }

  filterProductWithPriceBetween(above, below) {
    const filterPrice = {
      'above': above,
      'below': below
    };
    return this.httpClient.get(Server.address + 'product/filterPrice', {
      params: filterPrice
    });
  }

  getAllProductsTitleFromDatabase() {
    return this.httpClient.get(Server.address + 'product/getAllProductsTitle').subscribe(
      (titles: String[]) => {
        this.directoryTitles.titles = titles;
        this.productTitleEmitter.emit(this.directoryTitles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductTitles() {
    return this.directoryTitles.titles;
  }

  setReminder(reminderDto: ReminderDto) {
    return this.httpClient.post(Server.address + 'product/setReminder', reminderDto);
  }

  getMaxProductPrice() {
    return this.httpClient.get(Server.address + 'product/maxprice').subscribe(
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
    return this.httpClient.post(Server.address + 'newsletter/subscribe', subscriber);
  }

  getCategoryNames() {
    return this.httpClient.get(Server.address + 'category/all');
  }

  getProductWithCategory(category: string) {
    const params = {category: category};
    return this.httpClient.get(Server.address + 'category/product', {
      params
    });
  }

  confirmNewsletterEmail(email: string, confirmCode: string) {
    const confirmDto = {email: email, confirmCode: confirmCode};
    return this.httpClient.post(Server.address + 'newsletter/confirm', confirmDto
    );
  }

  confirmAccount(email: string, confirmCode: string) {
    const confirmDto = {email: email, confirmCode: confirmCode};
    return this.httpClient.post(Server.address + 'auth/account/confirm', confirmDto);
  }

  downloadApprovedCountry() {
    return this.httpClient.get(Server.address + 'location/country/approved').subscribe(
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

    return this.httpClient.get(Server.address + 'location/check', {
      params: params
    });
  }
}
