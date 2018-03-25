import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../services/orders.service';
import {ShippingAddress} from '../model/shipping-address';

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.css']
})
export class DeliveryStatusComponent implements OnInit {
  private shippingAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private order: Order = new Order(null, null, null, null, null, null, this.shippingAddress, null, null, null, null);
  private id: number;
  constructor(private activatedRoute: ActivatedRoute,
              private ordersService: OrdersService) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this.id).subscribe(
      (order: any) => {
        console.log(order);
        this.order = order;
      },
      (error) => console.log(error)
    );
  }

}
