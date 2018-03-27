import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Order} from '../model/order';
import {ShippingAddress} from '../model/shipping-address';
import {OrderStatus} from '../model/order-status';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {
  }

  orderDetail = new EventEmitter<Order>();

  getUserOrders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {login: localStorage.getItem('login')};

    return this.http.get('http://localhost:8080/buy/getOrders', {
      headers: headers,
      params: params
    });
  }

  getOneOrder(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const idSting = String(id);
    const params = {id: idSting};

    return this.http.get('http://localhost:8080/buy/getOrder', {
      headers: headers,
      params: params
    });
  }

  buyAllProductFromBucket(shippingAddress: ShippingAddress) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    const login = localStorage.getItem('login');

    return this.http.post('http://localhost:8080/buy/buy', shippingAddress, {
      headers: headers
    });
  }

  getAllOrdersInShop() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/buy/getAllOrdersInShop', {
      headers: headers
    });
  }

  paymentVerification(orderStatus: OrderStatus) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));


    return this.http.put('http://localhost:8080/buy/paymentVerification', orderStatus, {
      headers: headers
    });
  }

  orderPrepared(orderStatus: OrderStatus) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.http.put('http://localhost:8080/buy/orderPrepared', orderStatus, {
      headers: headers
    });
  }

  sendOrder(orderStatus: OrderStatus) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.http.put('http://localhost:8080/buy/sendOrder', orderStatus, {
      headers: headers
    });
  }

  searchOrderContainsProduct(title) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {title: title};
    return this.http.get('http://localhost:8080/buy/searchOrderContainsProduct', {
      headers: headers,
      params: params
    });
  }

  filterOrdersWithState(state) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {state: state};

    return this.http.get('http://localhost:8080/buy/filterOrderState', {
      headers: headers,
      params: params
    });
  }

  filterOrdersWithDate(dateAfter, dateBefore) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    const params = {dateAfter: dateAfter, dateBefore: dateBefore};

    return this.http.get('http://localhost:8080/buy/filterOrderDate', {
      headers: headers,
      params: params
    });
  }

  filterOrdersByUserLogin(userLogin) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    const params = {userLogin: userLogin};

    return this.http.get('http://localhost:8080/buy/filterOrderByUserLogin', {
      headers: headers,
      params: params
    });
  }

  getAllUserLogin() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/buy/getAllUserLogin', {
      headers: headers
    });
  }


}
