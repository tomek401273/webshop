import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderStatus} from '../../../model/order-status';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../model/order';
import {isNull} from 'util';
import {OrdersService} from '../../../services/orders.service';
import {ShippingAddress} from '../../../model/shipping-address';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-order-admin-detail',
  templateUrl: './order-admin-detail.component.html',
  styleUrls: ['./order-admin-detail.component.css']
})
export class OrderAdminDetailComponent implements OnInit {
  private _id: number;
  private _shippingAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private _order: Order = new Order(null, null, null, null, null, null, this._shippingAddress, null, null, null, null, null);
  private _paid = false;
  private _prepared = false;
  private _send = false;
  private _allProductPacked = false;
  private _linkDelivery = '';
  private _delivered = false;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get shippingAddress(): ShippingAddress {
    return this._shippingAddress;
  }

  set shippingAddress(value: ShippingAddress) {
    this._shippingAddress = value;
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  get paid(): boolean {
    return this._paid;
  }

  set paid(value: boolean) {
    this._paid = value;
  }

  get prepared(): boolean {
    return this._prepared;
  }

  set prepared(value: boolean) {
    this._prepared = value;
  }

  get send(): boolean {
    return this._send;
  }

  set send(value: boolean) {
    this._send = value;
  }

  get allProductPacked(): boolean {
    return this._allProductPacked;
  }

  set allProductPacked(value: boolean) {
    this._allProductPacked = value;
  }

  get linkDelivery(): string {
    return this._linkDelivery;
  }

  set linkDelivery(value: string) {
    this._linkDelivery = value;
  }

  get delivered(): boolean {
    return this._delivered;
  }

  set delivered(value: boolean) {
    this._delivered = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }

  ngOnInit() {
    // Observable.interval(20000).subscribe(x => {
    //   this.getData();
    // });
    this._id = Number(this.activatedRoute.snapshot.params['id']) | 0;
  }

  getData() {
    this.ordersService.getOneOrder(this._id).subscribe(
      (order: any) => {
        this._order = order;
        if ('_paid' === this._order.statusCode) {
          this._paid = true;
        }
        if ('_prepared' === this._order.statusCode) {
          this._paid = true;
          this._prepared = true;
        }
        if ('send' === this._order.statusCode) {
          this._paid = true;
          this._prepared = true;
          this._send = true;
          this.checkDeliver();
        }
        if ('_delivered' === this._order.statusCode) {
          this._paid = true;
          this._delivered = true;
        }

        for (let i = 0; i < this._order.productBoughts.length; i++) {
          this._order.productBoughts[i].packed = false;
        }

      },
      () => this._error.show()
    );
  }

  checkDeliver() {

  }

  onPrepared() {
    const prepared: OrderStatus = new OrderStatus(localStorage.getItem('login'), this._order.id, null, '_prepared');
    this.ordersService.orderPrepared(prepared).subscribe(
      (response: boolean) => {

        if (response) {
          this._prepared = true;
          this._order.status = 'Order was prepared and is ready to send';
        }
      },
      () => {
        this._error.show();
      }
    );
  }

  onProductPrepared(id: number) {
    this._order.productBoughts[id].packed = !this._order.productBoughts[id].packed;
    this._allProductPacked = true;
    for (let i = 0; i < this._order.productBoughts.length; i++) {
      if (!this._order.productBoughts[i].packed) {
        this._allProductPacked = false;
      }
    }
  }

  onSend() {
    const send: OrderStatus = new OrderStatus(localStorage.getItem('login'), this._order.id, this._linkDelivery, 'send');
    this.ordersService.sendOrder(send).subscribe(
      (response: boolean) => {
        if (response) {
          this._send = true;
          this._order.status = 'Order was send check status delivery in link';
        }
      },
      () => {
        this._error.show();
      }
    );
  }

  onDeliveryDetail() {
    this.router.navigate(['/delivery/' + this._order.id]);
  }

  onCrone() {
    console.log('Crone Crone');
  }
}
