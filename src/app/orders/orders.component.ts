import {Component, OnInit, ViewChild} from '@angular/core';
import {ServerService} from '../services/server.service';
import {OrdersService} from '../services/orders.service';
import {Order} from '../model/order';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PagerService} from '../services/navigation/pager.service';
import {ShowPublicDataSevice} from '../services/show-public-data.sevice';
import {DirectoryTitles} from '../model/directory-titles';
import {UsersLogin} from '../model/users-login';
import {OrderSearch} from '../model/order-search';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private orders: Order[] = [];
  usersLogin: String[] = [];
  private defaultState = 'all';
  @ViewChild('form') searchForm: NgForm;
  selected: string;
  private pagedProduct: any[];
  private pager: any = {};
  @ViewChild('f') search: NgForm;
  private defaultProductTitle = '';
  private defaultDates = '';
  productsTitle: String[] = [];

  constructor(private serverService: ServerService,
              private ordersService: OrdersService,
              private router: Router,
              private pagerService: PagerService,
              private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.getUsersLoginSub();
    this.getUsersLogin();
    this.getAllProductsTitle();
    this.getProductTitlesFromService();

    this.ordersService.getUserOrders()
      .subscribe(
        (orders: any) => {
          this.orders = orders;
          this.setPage(1);
        },
        (error) => console.log(error)
      );
  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/orders/' + order.id]);
  }

  onSubmit() {
    const dates = this.search.value.dates;
    let from: string;
    let to: string;
    if (dates === null || dates[0] === undefined) {
      from = '';
      to = '';
    } else {
      from = dates[0].toLocaleDateString();
      to = dates[1].toLocaleDateString();
    }

    const orderSearch: OrderSearch = new OrderSearch(this.defaultProductTitle, from, to, this.search.value.state, localStorage.getItem('login'));
    this.ordersService.searchOrders(orderSearch).subscribe(
      (orders: any[]) => {
        this.orders = orders;
        this.pagedProduct = [];
        this.setPage(1);

      },
      (error) => console.log(error)
    );
  }

  onReset() {
    this.defaultProductTitle = '';
    this.defaultDates = '';
    this.defaultState = 'all';
    this.selected = '';
  }

  setPage(page: number) {
    if (page < 1 || page > this.orders.length) {
      return;
    }
    this.pager = this.pagerService.getPager(this.orders.length, page);
    this.pagedProduct = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this.productsTitle = directoryTitles.titles;
    });
  }

  getProductTitlesFromService() {
    this.productsTitle = this.showPublicData.getProductTitles();
  }

  getUsersLoginSub() {
    this.ordersService.usersLoginEmitter.subscribe((usersLogin: UsersLogin) => {
      this.usersLogin = usersLogin.logins;
    });
  }

  getUsersLogin() {
    this.usersLogin = this.ordersService.getUsersLogin();
  }

}
