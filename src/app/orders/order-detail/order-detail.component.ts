import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {Order} from '../../model/order';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingAddress} from '../../model/shipping-address';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private _id: number;
  private _shippingAddress: ShippingAddress = new ShippingAddress();
  private _order: Order = new Order();
  private _isPaid = false;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this._id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this._id).subscribe(
      (order: any) => {
        this._order = order;
        this.order.shippingAddressDto.postCode = order.shippingAddressDto.postalCode;
        if ('Order was booked' === this._order.status) {
          this._isPaid = true;
        }
      },
      () => this._error.show()
    );
  }

  onPay() {
    this.router.navigate(['/success/' + this._order.id]);
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

  get isPaid(): boolean {
    return this._isPaid;
  }

  set isPaid(value: boolean) {
    this._isPaid = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }
}
