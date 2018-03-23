import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {ServerService} from '../../services/server.service';
import {OrdersService} from '../../services/orders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  private orders: Order[] = [];

  constructor(private serverService: ServerService,
              private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit() {
    this.ordersService.getAllOrdersInShop().subscribe(
      (orders: any) => {
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/admin-orders/' + order.id]);
  }

}
