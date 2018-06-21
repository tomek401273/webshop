import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ServerService} from '../../services/server.service';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {PagerService} from '../../services/navigation/pager.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ProductDataAmount} from '../../model/product-data-amount';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {
  private _products: ProductDataAmount[] = [];
  private _productDataEdit: ProductDataAmount[] = [];
  private _pager: any = {};
  private _pagedProducts: ProductDataAmount[] = [];
  private _currentPage = 1;
  private _redirectedPage = 1;
  private _lastPage = false;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private router: Router,
              private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngAfterContentChecked() {
    this.serverService.onProductUpdated.subscribe(
      (productUpdated: ProductDataAmount) =>
        this._productDataEdit[productUpdated.id - 1] =
          new ProductDataAmount(
            productUpdated.id,
            productUpdated.price,
            productUpdated.title,
            productUpdated.description,
            productUpdated.imageLink)
    );
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => {
          this._redirectedPage = params['numberpage'];
          this._lastPage = params['lastpage'];
        },
        () => this._error.show()
      );

    this.showPublicData.getProductsToEdit()
      .subscribe(
        (procucts: any[]) => {
          this._products = procucts;
          this._redirectedPage = (typeof this._redirectedPage === 'undefined') ? 1 : this._redirectedPage;

          if (this._lastPage) {
            this.computeNunberPages();
            this._redirectedPage = this._pager.pages.length;
          }
          this.setPage(this._redirectedPage);
        },
        () => this._error.show()
      );
  }

  onEditDetail(id: number) {
    this.router.navigate(['/productEdit', id], {queryParams: {numberpage: this._currentPage}});
  }

  onRemove(poroductDeteted, id: number) {
    this.serverService.removeProduct(poroductDeteted.id)
      .subscribe(
        (response) => {
          this.serverService.onProductRemoved.emit(poroductDeteted);
          this._pagedProducts.splice(id, 1);
        },
        () => this._error.show()
      );
  }

  computeNunberPages() {
    this._pager = this.pagerService.getPager(this._productDataEdit.length, 1);
  }

  setPage(page: number) {
    this._currentPage = page;
    if (page < 1 || page > this._products.length) {
      return;
    }
    this._pager = this.pagerService.getPager(this._products.length, page);
    this._pagedProducts = this._products.slice(this._pager.startIndex, this._pager.endIndex + 1);
  }

  get products(): ProductDataAmount[] {
    return this._products;
  }

  set products(value: ProductDataAmount[]) {
    this._products = value;
  }

  get productDataEdit(): ProductDataAmount[] {
    return this._productDataEdit;
  }

  set productDataEdit(value: ProductDataAmount[]) {
    this._productDataEdit = value;
  }

  get pager(): any {
    return this._pager;
  }

  set pager(value: any) {
    this._pager = value;
  }

  get pagedProducts(): ProductDataAmount[] {
    return this._pagedProducts;
  }

  set pagedProducts(value: ProductDataAmount[]) {
    this._pagedProducts = value;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }

  get redirectedPage(): number {
    return this._redirectedPage;
  }

  set redirectedPage(value: number) {
    this._redirectedPage = value;
  }

  get lastPage(): boolean {
    return this._lastPage;
  }

  set lastPage(value: boolean) {
    this._lastPage = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }
}
