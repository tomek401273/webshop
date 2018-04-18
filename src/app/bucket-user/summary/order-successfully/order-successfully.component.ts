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
  private isPaid = false;
  private redirectToBank = false;
  private id: number;
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
  }

  onPay() {
    const payment: OrderStatus = new OrderStatus(localStorage.getItem('login'), this.id, null, 'paid');
    this.redirectToBank = true;

    setTimeout(() => {
      this.redirectToBank = false;
      this.ordersService.paymentVerification(payment).subscribe(
        (response: boolean) => {
          if (response) {
            this.success.show()
            this.isPaid = true;
          }
        },
        (error) => this.error.show()
      );
    }, 3000);
  }

}
