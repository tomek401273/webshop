import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderStatus} from '../../../model/order-status';
import {OrdersService} from '../../../services/orders.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-order-successfully',
  templateUrl: './order-successfully.component.html',
  styleUrls: ['./order-successfully.component.css']
})
export class OrderSuccessfullyComponent implements OnInit {
  private _isPaid = false;
  private _redirectToBank = false;
  private _id: number;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute) {
  }

  get isPaid(): boolean {
    return this._isPaid;
  }

  set isPaid(value: boolean) {
    this._isPaid = value;
  }

  get redirectToBank(): boolean {
    return this._redirectToBank;
  }

  set redirectToBank(value: boolean) {
    this._redirectToBank = value;
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
  }

  onPay() {
    const payment: OrderStatus = new OrderStatus(localStorage.getItem('login'), this._id, null, 'paid');
    this._redirectToBank = true;

    setTimeout(() => {
      this._redirectToBank = false;
      this.ordersService.paymentVerification(payment).subscribe(
        (response: boolean) => {
          if (response) {
            this._isPaid = true;
          }
        },
        (error) => this._error.show()
      );
    }, 3000);
  }

}
