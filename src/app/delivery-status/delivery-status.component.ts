import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../model/order';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../services/orders.service';
import {ShippingAddress} from '../model/shipping-address';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.css']
})
export class DeliveryStatusComponent implements OnInit {
  private _shippingAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private _order: Order = new Order(null, null, null, null, null, null, this._shippingAddress, null, null, null, null, null);
  private _id: number;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private ordersService: OrdersService) {
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

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }

  ngOnInit() {
    this._id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this._id).subscribe(
      (order: any) => {
        this._order = order;
      },
      () => this._error.show()
    );
  }

}
