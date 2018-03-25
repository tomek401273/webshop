import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {Order} from '../../model/order';
import {ActivatedRoute} from '@angular/router';
import {ShippingAddress} from '../../model/shipping-address';
import {OrderStatus} from '../../model/order-status';
import {isNull} from 'util';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private id: number;
  private shippingAddress: ShippingAddress = new ShippingAddress('', '', '', '', '', '', '', '');
  private order: Order = new Order(null, null, null, null, null, null, this.shippingAddress, '', null, null, null,);
  private paid = false;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this.id).subscribe(
      (order: any) => {
        console.log(order);
        this.order = order;
        if ('Order was booked' !== this.order.status) {
          this.paid = true;
        }

      },
      (error) => console.log(error)
    );
  }

  onPay() {
    const payment: OrderStatus = new OrderStatus(localStorage.getItem('login'), this.order.id, true, null, null, null);
    console.log('payment');
    console.log(payment);
    this.ordersService.paymentVerification(payment).subscribe(
      (response: boolean) => {
        console.log('response: ');
        console.log(response);
        if (response) {
          this.order.status = 'Transaction confirmed';
        }

        // this.order.status = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
