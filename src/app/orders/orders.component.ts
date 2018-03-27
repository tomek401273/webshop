import {Component, OnInit} from '@angular/core';
import {ServerService} from '../services/server.service';
import {OrdersService} from '../services/orders.service';
import {Order} from '../model/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private orders: Order[] = [];

  constructor(private serverService: ServerService,
              private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit() {

    this.ordersService.getUserOrders()
      .subscribe(
        (orders: any) => {
          this.orders = orders;
        },
        (error) => console.log(error)
      );
  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/orders/' + order.id]);
  }


}
