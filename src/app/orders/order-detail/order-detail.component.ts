import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../model/order";
import {ActivatedRoute} from "@angular/router";
import {ShippingAddress} from "../../model/shipping-address";
import {Payment} from "../../model/payment";
import {isNull} from "util";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private id: number;
  private shippingAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private order: Order = new Order(null, null, null, null, null, null, null, null, null, this.shippingAddress);

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this.id).subscribe(
      (order: any) => {
        this.order = order;
        console.log(this.order)
      },
      (error) => console.log(error)
    );
  }

  onPay() {
    let payment: Payment = new Payment(localStorage.getItem('login'), this.order.id, !this.order.paid);
    console.log('payment');
    console.log(payment);
    this.ordersService.paymentVerification(payment).subscribe(
      (response: boolean) => {
        console.log('response: ');
        console.log(response);
        if (isNull(response)){
          this.order.paid=false;
        } else {
          this.order.paid= true;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
