import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../model/order';
import {ServerService} from '../../services/server.service';
import {OrdersService} from '../../services/orders.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PagerService} from '../../services/navigation/pager.service';
import {OrderSearch} from '../../model/order-search';
import {DirectoryTitles} from '../../model/directory-titles';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {UsersLogin} from '../../model/users-login';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
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
  currentRate = 8;
  @ViewChild('error') error: SwalComponent;
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
    this.ordersService.getAllOrdersInShop().subscribe(
      (orders: any) => {
        this.orders = orders;
        this.setPage(1);
      },
      () => this.error.show()
    );
  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/admin-orders/' + order.id]);
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

    const orderSearch: OrderSearch = new OrderSearch(this.defaultProductTitle, from, to, this.search.value.state, this.selected);
    this.ordersService.searchOrders(orderSearch).subscribe(
      (orders: any[]) => {
        this.orders = orders;
        this.pagedProduct = [];
        this.setPage(1);

      },
      () => this.error.show()
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

