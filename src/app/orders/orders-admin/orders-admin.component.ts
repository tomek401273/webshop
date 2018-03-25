import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../model/order';
import {ServerService} from '../../services/server.service';
import {OrdersService} from '../../services/orders.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PagerService} from '../../services/navigation/pager.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  private orders: Order[] = [];
  usersLogin: String[] = [];
  private typedTitleLengthTemp = 0;
  private defaultState = 'paid';
  @ViewChild('form') searchForm: NgForm;

  selected: string;

  private pagedProduct: any[];
  private pager: any = {};




  constructor(private serverService: ServerService,
              private ordersService: OrdersService,
              private router: Router,
              private pagerService: PagerService) {
  }

  ngOnInit() {
    this.ordersService.getAllOrdersInShop().subscribe(
      (orders: any) => {
        this.orders = orders;
        this.setPage(1);
      },
      (error) => console.log(error)
    );

    this.ordersService.getAllUserLogin().subscribe(
      (response: any[]) => {
        console.log('usersLogin');
        console.log(response);
        this.usersLogin = response;
      },
      (error) => console.log(error)
    );

  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/admin-orders/' + order.id]);
  }

  onSubmitSearch() {
    if (this.searchForm.value.search.length === 1 && this.typedTitleLengthTemp === 3) {
      this.typedTitleLengthTemp = 0;
    }

    if (this.searchForm.value.search.length > 2) {
      this.typedTitleLengthTemp = 3;
      this.ordersService.searchOrderContainsProduct(this.searchForm.value.search).subscribe(
        (orders: any[]) => {
          this.orders = orders;
        },
        (error) => console.log(error)
      );
    }
  }

  onfilterOrdersWithState(filter) {
    this.ordersService.filterOrdersWithState(filter.value.state).subscribe(
      (orders: any[]) => {
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }

  onFilterOrdersWithDate(date) {
    this.ordersService.filterOrdersWithDate(date.value.after, date.value.before).subscribe(
      (orders: any[]) => {
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }

  onFilterOrdersByUserLogin(userLogin) {
    this.ordersService.filterOrdersByUserLogin(userLogin.value.userLogin).subscribe(
      (orders: any[]) => {
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }

  onFilterUser() {
    if (this.selected.length > 3) {
      console.log(this.selected.length);
      console.log(this.selected);

      this.ordersService.filterOrdersByUserLogin(this.selected).subscribe(
        (orders: any[]) => {
          this.orders = orders;
        },
        (error) => console.log(error)
      );

    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.orders.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.orders.length, page);
    this.pagedProduct = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
