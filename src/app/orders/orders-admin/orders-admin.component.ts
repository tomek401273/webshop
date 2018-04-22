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
  private _orders: Order[] = [];
  private _usersLogin: String[] = [];
  private _defaultState = 'all';
  @ViewChild('form') private _searchForm: NgForm;
  private _selected: string;
  private _pagedProduct: any[];
  private _pager: any = {};
  @ViewChild('f') private _search: NgForm;
  private _defaultProductTitle = '';
  private _defaultDates = '';
  private _productsTitle: String[] = [];
  private _currentRate = 8;
  @ViewChild('error') private _error: SwalComponent;

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
        this._orders = orders;
        this.setPage(1);
      },
      () => this._error.show()
    );
  }

  showOrderDetail(order: Order) {
    this.router.navigate(['/admin-orders/' + order.id]);
  }

  onSubmit() {
    const dates = this._search.value.dates;
    let from: string;
    let to: string;
    if (dates === null || dates[0] === undefined) {
      from = '';
      to = '';
    } else {
      from = dates[0].toLocaleDateString();
      to = dates[1].toLocaleDateString();
    }

    const orderSearch: OrderSearch = new OrderSearch(this._defaultProductTitle, from, to, this._search.value.state, this._selected);
    this.ordersService.searchOrders(orderSearch).subscribe(
      (orders: any[]) => {
        this._orders = orders;
        this._pagedProduct = [];
        this.setPage(1);

      },
      () => this._error.show()
    );
  }

  onReset() {
    this._defaultProductTitle = '';
    this._defaultDates = '';
    this._defaultState = 'all';
    this._selected = '';
  }

  setPage(page: number) {
    if (page < 1 || page > this._orders.length) {
      return;
    }
    this._pager = this.pagerService.getPager(this._orders.length, page);
    this._pagedProduct = this._orders.slice(this._pager.startIndex, this._pager.endIndex + 1);
  }

  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this._productsTitle = directoryTitles.titles;
    });
  }

  getProductTitlesFromService() {
    this._productsTitle = this.showPublicData.getProductTitles();
  }

  getUsersLoginSub() {
    this.ordersService.usersLoginEmitter.subscribe((usersLogin: UsersLogin) => {
      this._usersLogin = usersLogin.logins;
    });
  }

  getUsersLogin() {
    this._usersLogin = this.ordersService.getUsersLogin();
  }


  get orders(): Order[] {
    return this._orders;
  }

  set orders(value: Order[]) {
    this._orders = value;
  }

  get usersLogin(): String[] {
    return this._usersLogin;
  }

  set usersLogin(value: String[]) {
    this._usersLogin = value;
  }

  get defaultState(): string {
    return this._defaultState;
  }

  set defaultState(value: string) {
    this._defaultState = value;
  }

  get searchForm(): NgForm {
    return this._searchForm;
  }

  set searchForm(value: NgForm) {
    this._searchForm = value;
  }

  get selected(): string {
    return this._selected;
  }

  set selected(value: string) {
    this._selected = value;
  }

  get pagedProduct(): any[] {
    return this._pagedProduct;
  }

  set pagedProduct(value: any[]) {
    this._pagedProduct = value;
  }

  get pager(): any {
    return this._pager;
  }

  set pager(value: any) {
    this._pager = value;
  }

  get search(): NgForm {
    return this._search;
  }

  set search(value: NgForm) {
    this._search = value;
  }

  get defaultProductTitle(): string {
    return this._defaultProductTitle;
  }

  set defaultProductTitle(value: string) {
    this._defaultProductTitle = value;
  }

  get defaultDates(): string {
    return this._defaultDates;
  }

  set defaultDates(value: string) {
    this._defaultDates = value;
  }

  get productsTitle(): String[] {
    return this._productsTitle;
  }

  set productsTitle(value: String[]) {
    this._productsTitle = value;
  }

  get currentRate(): number {
    return this._currentRate;
  }

  set currentRate(value: number) {
    this._currentRate = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }
}
