import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import {Order} from "../model/order";
import {ShippingAddress} from "../model/shipping-address";
import {Payment} from "../model/payment";

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {
  }

  orderDetail = new EventEmitter<Order>();

  getUserOrders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
    const params = {login: localStorage.getItem("login")};

    return this.http.get('http://localhost:8080/buy/getOrders', {
      headers: headers,
      params: params
    });
  }

  getOneOrder(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));
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
      .append('Authorization', localStorage.getItem("token"));

    const login = localStorage.getItem("login");

    return this.http.post('http://localhost:8080/buy/buy', shippingAddress, {
      headers: headers
    })
  }

  getAllOrdersInShop() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));

    return this.http.get('http://localhost:8080/buy/getAllOrdersInShop', {
      headers: headers
    })
  }

  paymentVerification(payment: Payment) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem("token"));


    return this.http.put('http://localhost:8080/buy/paymentVerification',payment, {
      headers: headers
    } )
  }

}
