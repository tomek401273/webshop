import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDataAmount} from '../../model/product-data-amount';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {IonRangeSliderComponent} from 'ng2-ion-range-slider';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../services/server.service';
import {PagerService} from '../../services/navigation/pager.service';
import {BucketService} from '../../services/bucket.service';
import {BucketServerService} from '../../services/bucket-server.service';
import {LogingService} from '../../services/loging.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {isNull, isUndefined} from 'util';
import {ReminderDto} from '../../model/dto/reminder-dto';
import {Comment} from '../../model/comment';
import {ProductMarkDto} from '../../model/dto/product-mark-dto';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, DoCheck {
  private _product: ProductDataAmount = new ProductDataAmount(null, null, null, null, null);
  private _productsTitle: String[] = [];
  private _bucketProducts: ProductDataAmount[] = [];
  private _pager: any = {};
  private _pagedProduct: any[];
  private _isAuthenticated = false;
  private _typedTitleLengthTemp = 0;
  private _sale = 'sale';
  @ViewChild('form') private _searchForm: NgForm;
  @ViewChild('_advancedSliderElement') private _advancedSliderElement: IonRangeSliderComponent;
  private _hovered = 0;
  private _userLogin = '';
  private _commentMessage = '';
  @ViewChild('success') private _success: SwalComponent;
  @ViewChild('error') private _error: SwalComponent;

  constructor(private _activatedRounte: ActivatedRoute,
              private _router: Router,
              private _showPublicDataService: ShowPublicDataSevice,
              private _serverService: ServerService,
              private _showPublicData: ShowPublicDataSevice,
              private _pagerService: PagerService,
              private _bucketService: BucketService,
              private _bucketServerService: BucketServerService,
              private _logingServiece: LogingService,
              private _modalService: BsModalService) {
  }

  ngOnInit() {
    const id = Number(this._activatedRounte.snapshot.params['id']);
    this._showPublicDataService.getProduct(id).subscribe(
      (response: any) => {
        this._product = response;
      },
      () => this._error.show()
    );
    this._userLogin = localStorage.getItem('login');
    this.getTemp();
  }

  ngDoCheck() {
    this._isAuthenticated = this._logingServiece.isAuthenticated();
  }

  onAddToCard(product) {
    this._showPublicData.checkAvailable(product.id).subscribe(
      (resposne) => {
        if (resposne > 0) {

          this.addProductToBucket(product);
          this.saveTemp();
          this.acutalNumberProductInBucket();
          if (this._isAuthenticated === true) {
            this._bucketServerService.addProductToCard(product.id).subscribe(
              (resposne2) => {
                if (resposne2 === true) {
                  this._success.text = 'Successfully added product to bucket';
                  this._success.show();
                } else {
                  this._error.show();
                }
              }
            );
          }
        } else {
          this._success.text = 'This product is not available';
          this._success.show();
        }

      },
      () => this._error.show()
    );
  }

  acutalNumberProductInBucket() {
    let totalNumber = 0;
    for (const prod of this._bucketProducts) {
      totalNumber += prod.getTotalAmount;
    }
    this._bucketService.bucketStatus.emit(totalNumber.toString());
  }

  addProductToBucket(product) {
    const founded: ProductDataAmount = this._bucketProducts.find(x => x.getId === product.id);

    if (isUndefined(founded)) {
      // this._bucketProducts.push(new ProductDataAmount(
      //   product.id,
      //   product.price,
      //   product.title,
      //   product.description,
      //   product.imageLink,
      //   1,
      //   null,
      //   null));

      const productDataAmount: ProductDataAmount = new ProductDataAmount(
        product.id,
        product.price,
        product.title,
        product.description,
        product.imageLink
      );
      productDataAmount.setTotalAmount = 1;
      this._bucketProducts.push(productDataAmount);
      return;
    } else {
      const index = this._bucketProducts.indexOf(founded);
      let amount = founded.getTotalAmount;
      amount++;
      founded.setTotalAmount = amount;
      this._bucketProducts[index] = founded;
    }
  }

  getTemp() {
    const bucket = JSON.parse(localStorage.getItem('bucket123'));
    if (!isNull(bucket)) {
      for (let i = 0; i < bucket.length; i++) {
        // const bucketProduct: ProductDataAmount = new ProductDataAmount(
        //   bucket[i].id,
        //   bucket[i].price,
        //   bucket[i].title,
        //   bucket[i].description,
        //   bucket[i].imageLink,
        //   bucket[i].totalAmount,
        //   null,
        //   null);

        const bucketProduct: ProductDataAmount = new ProductDataAmount(
          bucket[i].id,
          bucket[i].price,
          bucket[i].title,
          bucket[i].description,
          bucket[i].imageLink
        );
        bucketProduct.setTotalAmount = bucket[i].totalAmount;
        this._bucketProducts.push(bucketProduct);
      }
    }
  }

  saveTemp() {
    localStorage.setItem('bucket123', null);
    const bucketToSave = JSON.stringify(this._bucketProducts);
    localStorage.setItem('bucket123', bucketToSave);
  }

  onSetSubscription(email, productId) {

    const reminderDto: ReminderDto = new ReminderDto(productId, email.value);
    this._showPublicData.setReminder(reminderDto).subscribe(
      () => {
        this._success.text = 'Reminder succesully set';
        this._success.show();
      },
      () => this._error.show()
    );
  }

  onRated(rate, productId) {
    if (this._isAuthenticated) {
      const productMarkDto: ProductMarkDto = new ProductMarkDto(localStorage.getItem('login'), productId, rate.rate);
      this._serverService.markProduct(productMarkDto).subscribe(
        (response: ProductMarkDto) => {
          this._product.setMarksAverage = response.averageMarks;
          this._product.setCountMarks = response.countMarks;
          this._product.setRated = true;
          this._success.text = 'Thank you for rated our product';
          this._success.show();

        },
        () => this._error.show()
      );
    }
  }

  onAddComment(productId) {
    // const comment: Comment = new Comment(localStorage.getItem('login'), this._commentMessage, productId);
    const comment: Comment = new Comment();
    comment.login = localStorage.getItem('login');
    comment.message = this.commentMessage;
    comment.productId = productId;
    this._serverService.addComment(comment).subscribe(
      (response: Comment[]) => {
        this._product.setCommentDtos = response;
        this._commentMessage = '';
        this._success.text = 'Thank you for comment our product';
        this._success.show();
      },
      () => this._error.show()
    );
  }

  onRemoveComment(commentId, commentPosition) {
    this._serverService.removeComment(commentId).subscribe(
      (response) => {
        if (response) {
          this._product.setCommentDtos.splice(commentPosition, 1);
          this._success.text = 'You successfully deleted comment';
          this._success.show();
        }
      },
      () => this._error.show()
    );
  }

  onEditComment(editMessage, commentId) {
    const comment: Comment = new Comment();
    comment.message = editMessage.value;
    comment.id = commentId;
    this._serverService.editComment(comment).subscribe(
      (response: boolean) => {
        if (response) {
          this._product.setCommentDtos.find(x => x.id === commentId).message = editMessage.value;
          this._product.setCommentDtos.find(x => x.id === commentId).editComment = false;
          this._success.text = 'You successfully edited comment';
          this._success.show();
        } else {
          this._error.show();
        }
      },
      () => this._error.show()
    );
  }

  mouseHover(e) {
    e.changeComment = true;
  }

  mouseLeave(e) {
    e.changeComment = false;
  }

  mouseOver(element) {
    element.changeButton = true;
  }

  mouseOut(element) {
    element.changeButton = false;
  }

  get product(): ProductDataAmount {
    return this._product;
  }

  set product(value: ProductDataAmount) {
    this._product = value;
  }

  get productsTitle(): String[] {
    return this._productsTitle;
  }

  set productsTitle(value: String[]) {
    this._productsTitle = value;
  }

  get bucketProducts(): ProductDataAmount[] {
    return this._bucketProducts;
  }

  set bucketProducts(value: ProductDataAmount[]) {
    this._bucketProducts = value;
  }

  get pager(): any {
    return this._pager;
  }

  set pager(value: any) {
    this._pager = value;
  }

  get pagedProduct(): any[] {
    return this._pagedProduct;
  }

  set pagedProduct(value: any[]) {
    this._pagedProduct = value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get typedTitleLengthTemp(): number {
    return this._typedTitleLengthTemp;
  }

  set typedTitleLengthTemp(value: number) {
    this._typedTitleLengthTemp = value;
  }

  get sale(): string {
    return this._sale;
  }

  set sale(value: string) {
    this._sale = value;
  }

  get searchForm(): NgForm {
    return this._searchForm;
  }

  set searchForm(value: NgForm) {
    this._searchForm = value;
  }

  get advancedSliderElement(): IonRangeSliderComponent {
    return this._advancedSliderElement;
  }

  set advancedSliderElement(value: IonRangeSliderComponent) {
    this._advancedSliderElement = value;
  }

  get hovered(): number {
    return this._hovered;
  }

  set hovered(value: number) {
    this._hovered = value;
  }

  get userLogin(): string {
    return this._userLogin;
  }

  set userLogin(value: string) {
    this._userLogin = value;
  }

  get commentMessage(): string {
    return this._commentMessage;
  }

  set commentMessage(value: string) {
    this._commentMessage = value;
  }

  get success(): SwalComponent {
    return this._success;
  }

  set success(value: SwalComponent) {
    this._success = value;
  }

  get error(): SwalComponent {
    return this._error;
  }

  set error(value: SwalComponent) {
    this._error = value;
  }
}

