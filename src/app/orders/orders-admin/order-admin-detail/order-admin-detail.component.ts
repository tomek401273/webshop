import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderStatus} from '../../../model/order-status';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../model/order';
import {isNull} from 'util';
import {OrdersService} from '../../../services/orders.service';
import {ShippingAddress} from '../../../model/shipping-address';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-order-admin-detail',
  templateUrl: './order-admin-detail.component.html',
  styleUrls: ['./order-admin-detail.component.css']
})
export class OrderAdminDetailComponent implements OnInit {
  private id: number;
  private shippingAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private order: Order = new Order(null, null, null, null, null, null, this.shippingAddress, null, null, null, null, null);
  private paid = false;
  private prepared = false;
  private send = false;
  private allProductPacked = false;
  private linkDelivery = '';
  private delivered = false;
  @ViewChild('error') error: SwalComponent;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']) | 0;
    this.ordersService.getOneOrder(this.id).subscribe(
      (order: any) => {
        this.order = order;
        console.log(this.order);
        if ('paid' === this.order.statusCode) {
          this.paid = true;
        }
        if ('prepared' === this.order.statusCode) {
          this.paid = true;
          this.prepared = true;
        }
        if ('send' === this.order.statusCode) {
          this.paid = true;
          this.prepared = true;
          this.send = true;
        }
        if ('delivered' === this.order.statusCode) {
          this.paid = true;
          this.delivered = true;
        }

        for (let i = 0; i < this.order.productBoughts.length; i++) {
          this.order.productBoughts[i].packed = false;
        }

      },
      () => this.error.show()
    );
  }

  onPrepared() {
    const prepared: OrderStatus = new OrderStatus(localStorage.getItem('login'), this.order.id, null, 'prepared');
    this.ordersService.orderPrepared(prepared).subscribe(
      (response: boolean) => {

        if (response) {
          this.prepared = true;
          this.order.status = 'Order was prepared and is ready to send';
        }
      },
      () => {
        this.error.show()
      }
    );
  }

  onProductPrepared(id: number) {
    this.order.productBoughts[id].packed = !this.order.productBoughts[id].packed;
    this.allProductPacked = true;
    for (let i = 0; i < this.order.productBoughts.length; i++) {
      if (!this.order.productBoughts[i].packed) {
        this.allProductPacked = false;
      }
    }
  }

  onSend() {
    const send: OrderStatus = new OrderStatus(localStorage.getItem('login'), this.order.id, this.linkDelivery, 'send');
    this.ordersService.sendOrder(send).subscribe(
      (response: boolean) => {
        if (response) {
          this.send = true;
          this.order.status = 'Order was send check status delivery in link';
        }
      },
      () => {
        this.error.show();
      }
    );

    const delivered: OrderStatus = new OrderStatus(localStorage.getItem('login'), this.order.id, this.linkDelivery, 'delivered');
    this.ordersService.deliveredOrder(delivered).subscribe(
      (responseDelivered: boolean) => {
        if (responseDelivered) {
          this.order.status = 'Order was DELIVERD!!!';
        }
      },
      () => this.error.show()
    );

  }

  onDeliveryDetail() {
    this.router.navigate(['/delivery/' + this.order.id]);
  }
}
