import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Order} from '../model/order';
import {ShippingAddress} from '../model/shipping-address';
import {OrderStatus} from '../model/order-status';
import {OrderSearch} from '../model/order-search';
import {UsersLogin} from '../model/users-login';
import {ShippingAddressMapper} from '../model/dto/shipping-address-mapper';
import {ShippingAddressDto} from '../model/dto/shipping-address-dto';

@Injectable()
export class OrdersService {
  usersLogin: UsersLogin = new UsersLogin(null);
  usersLoginEmitter = new EventEmitter<UsersLogin>();
  private shippingMapper: ShippingAddressMapper = new ShippingAddressMapper();
  private shippingDto: ShippingAddressDto;

  constructor(private http: HttpClient) {
  }

  orderDetail = new EventEmitter<Order>();

  getUserOrders() {
    const params = {login: localStorage.getItem('login')};
    return this.http.get('http://localhost:8080/buy/getOrders', {
      params: params
    });
  }

  getOneOrder(id: number) {
    const idSting = String(id);
    const params = {id: idSting};
    return this.http.get('http://localhost:8080/buy/getOrder', {
      params: params
    });
  }

  buyAllProductFromBucket(shippingAddress: ShippingAddress) {
    this.shippingDto = this.shippingMapper.mapToShippingAddressDto(shippingAddress);
    return this.http.post('http://localhost:8080/buy/buy', this.shippingDto);
  }

  getAllOrdersInShop() {
    return this.http.get('http://localhost:8080/buy/getAllOrdersInShop');
  }

  paymentVerification(orderStatus: OrderStatus) {
    return this.http.put('http://localhost:8080/buy/paymentVerification', orderStatus);
  }

  orderPrepared(orderStatus: OrderStatus) {
    return this.http.put('http://localhost:8080/buy/orderPrepared', orderStatus);
  }

  sendOrder(orderStatus: OrderStatus) {
    return this.http.put('http://localhost:8080/buy/sendOrder', orderStatus);
  }

  deliveredOrder(orderStatus: OrderStatus) {
    return this.http.post('http://localhost:8080/buy/delivered', orderStatus);
  }

  getAllUserLogin() {
    return this.http.get('http://localhost:8080/buy/getAllUserLogin').subscribe(
      (response: any[]) => {
        this.usersLogin.logins = response;
        this.usersLoginEmitter.emit(this.usersLogin);
      },
      (error) => console.log(error)
    );
  }

  getUsersLogin() {
    return this.usersLogin.logins;
  }

  searchOrders(orderSearch: OrderSearch) {
    const params = {
      'productTitle': orderSearch.productTitle,
      'dateFrom': orderSearch.dateFrom,
      'dateTo': orderSearch.dateTo,
      'status': orderSearch.status,
      'userLogin': orderSearch.userLogin
    };

    return this.http.get('http://localhost:8080/buy/orderSearch', {
      params: params
    });
  }
}
