import {Component, DoCheck, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDataAmount} from '../../model/product-data-amount';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {IonRangeSliderComponent} from 'ng2-ion-range-slider';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../services/server.service';
import {PagerService} from '../../services/navigation/pager.service';
import {BucketService} from '../../bucket-user/bucket.service';
import {BucketServerService} from '../../bucket-user/bucket-server.service';
import {LogingService} from '../../services/loging.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {isNull, isUndefined} from 'util';
import {ReminderDto} from '../../model/dto/reminder-dto';
import {Comment} from '../../model/comment';
import {ProductMarkDto} from '../../model/dto/product-mark-dto';
import {DirectoryTitles} from '../../model/directory-titles';
import {ProductData} from '../../model/product-data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, DoCheck {
  private id: number;
  product: ProductDataAmount = new ProductDataAmount(null, null, null, null, null, null, null, null);

  productsTitle: String[] = [];
  chosenTitle: string;
  private bucketProducts: ProductDataAmount[] = [];
  private pager: any = {};
  private pagedProduct: any[];
  isAuthenticated = false;
  private typedTitleLengthTemp = 0;
  private sale = 'sale';
  @ViewChild('form') searchForm: NgForm;
  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  advancedSlider = {name: 'Advanced Slider', onFinish: undefined};
  private above = 0;
  private below = 120;
  maxValueProductInShop: number;
  maxValueCover = 3000;
  minValueCover = 23;
  hovered = 0;
  modalRef: BsModalRef;
  userLogin = '';
  commentMessage = '';

  constructor(private activatedRounte: ActivatedRoute,
              private router: Router,
              private showPublicDataService: ShowPublicDataSevice,
              private serverService: ServerService,
              private showPublicData: ShowPublicDataSevice,
              private pagerService: PagerService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService,
              private logingServiece: LogingService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRounte.snapshot.params['id']) | 0;
    this.showPublicDataService.getProduct(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.product = response;
        console.log(this.product);
      }
    );
    this.userLogin = localStorage.getItem('login');
    console.log(this.userLogin);
  }


  ngDoCheck() {
    this.isAuthenticated = this.logingServiece.isAuthenticated();
  }

  onAddToCard(product: ProductData) {
    this.showPublicData.checkAvailable(product.id).subscribe(
      (resposne) => {
        if (resposne > 0) {

          this.addProductToBucket(product);
          this.saveTemp();
          this.acutalNumberProductInBucket();
          if (this.isAuthenticated === true) {
            this.bucketServerService.addProductToCard(product.id).subscribe(
              (resposne2) => {
                if (resposne2 === true) {
                  alert('successfully added product to bucket');
                } else {
                  alert('something go wrong contact with our service');
                }

              }
            );
          }
        } else {
          alert('This product is not available');
        }

      },
      (error) => console.log(error)
    );
  }

  acutalNumberProductInBucket() {
    let totalNumber = 0;
    for (const prod of this.bucketProducts) {
      totalNumber += prod.totalAmount;
    }
    this.bucketService.bucketStatus.emit(totalNumber.toString());
  }

  addProductToBucket(product: ProductData) {
    const founded: ProductDataAmount = this.bucketProducts.find(x => x.id === product.id);

    if (isUndefined(founded)) {
      this.bucketProducts.push(new ProductDataAmount(
        product.id,
        product.price,
        product.title,
        product.description,
        product.imageLink,
        1,
        null,
        null));
      return;
    } else {
      const index = this.bucketProducts.indexOf(founded);
      let amount = founded.totalAmount;
      amount++;
      founded.totalAmount = amount;
      this.bucketProducts[index] = founded;
    }
  }

  saveTemp() {
    localStorage.setItem('bucket123', null);
    const bucketToSave = JSON.stringify(this.bucketProducts);
    localStorage.setItem('bucket123', bucketToSave);
  }


  getAllProductsTitle() {
    this.showPublicData.productTitleEmitter.subscribe((directoryTitles: DirectoryTitles) => {
      this.productsTitle = directoryTitles.titles;
    });
  }


  onSetSubscription(email, productId) {

    const reminderDto: ReminderDto = new ReminderDto(productId, email.value);
    this.showPublicData.setReminder(reminderDto).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  onRated(rate, productId) {
    if (this.isAuthenticated) {
      const productMarkDto: ProductMarkDto = new ProductMarkDto(localStorage.getItem('login'), productId, rate.rate);
      this.serverService.markProduct(productMarkDto).subscribe(
        (response: ProductMarkDto) => {
          this.product.marksAverage = response.averageMarks;
          this.product.countMarks = response.countMarks;
          this.product.rated = true;
        },
        (error) => console.log(error)
      );
    }
  }

  onAddComment(productId) {
    const comment: Comment = new Comment(localStorage.getItem('login'), this.commentMessage, productId);
    this.serverService.addComment(comment).subscribe(
      (response: Comment[]) => {
        this.product.commentDtos = response;
        this.commentMessage = '';
      },
      (error) => console.log(error)
    );
  }

  onRemoveComment(commentId, commentPosition) {
    console.log(commentId);
    this.serverService.removeComment(commentId).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.product.commentDtos.splice(commentPosition, 1);
        }
      },
      (error) => console.log(error)
    );
  }

  onEditComment(editMessage, commentId) {
    const comment: Comment = new Comment(null, editMessage.value, null);
    comment.id = commentId;
    this.serverService.editComment(comment).subscribe(
      (response: boolean) => {
        if (response) {
          this.product.commentDtos.find(x => x.id === commentId).message = editMessage.value;
          this.product.commentDtos.find(x => x.id === commentId).editComment = false;
        }
        console.log(response);
      },
      (error) => console.log(error)
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
}

