import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {Order} from '../../model/order';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingAddress} from '../../model/shipping-address';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private id: number;
  private shippingAddress: ShippingAddress = new ShippingAddress('', '', '', '', '', '', '', '');
  private order: Order = new Order(null, null, null, null, null, null, this.shippingAddress, '', null, null, null, null);
  private isPaid = false;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this.id).subscribe(
      (order: any) => {
        this.order = order;
        if ('Order was booked' === this.order.status) {
          this.isPaid = true;
        }

      },
      (error) => console.log(error)
    );
  }

  onPay() {
    this.router.navigate(['/success/' + this.order.id]);

  }

}
