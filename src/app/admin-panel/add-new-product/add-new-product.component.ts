import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../services/server.service';
import {CanDeactivateGuard} from '../../services/protect/can-deactivate-guard';
import {Observable} from 'rxjs/Observable';
import {ProductDataAmount} from '../../model/product-data-amount';
import {Router} from '@angular/router';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, CanDeactivateGuard {
  @ViewChild('f') private _addProductForm: NgForm;
  @ViewChild('_success') private _success: SwalComponent;
  @ViewChild('_error') private _error: SwalComponent;
  @ViewChild('_discard') private _discard: SwalComponent;
  private _productData: ProductDataAmount;
  private _savedChanges: boolean;
  private _categoryNames: string[] = [];
  private _discardChanges = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  private _photoName = '';
  private _photoSize: number;

  constructor(private  serverService: ServerService,
              private router: Router,
              private showPublicData: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.getCategoryNames();
  }


  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
      this._photoName = this.selectedFiles.item(0).name;
      this._photoSize = this.selectedFiles.item(0).size;
      console.log(this.selectedFiles.item(0).name);
      console.log(this.selectedFiles.item(0).size);
      if (this._photoSize >= 1048576) {
        alert('Photo is too big');
      }
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.serverService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  onSubmit() {
    this._productData = new ProductDataAmount(
      null,
      this._addProductForm.value.price,
      this._addProductForm.value.title,
      this._addProductForm.value.desc,
      this._addProductForm.value.image,
      this._addProductForm.value.amount,
      this._addProductForm.value.statusCode,
      null);
    this._productData.setCategory = this._addProductForm.value.category;
    this.serverService.addNewProduct(this._productData)
      .subscribe(
        (response: number) => {
          this._success.show();
          // tutaj nie mogą się zdecydować gdzie redirectoać
          // this.router.navigate(['/productEdit'], {queryParams: {lastpage: true}});
          this.router.navigate(['/product/' + response]);
        },
        () => this._error.show()
      );
    this._savedChanges = true;
  }

// nie bardzo wiem jak to zrobić z Sweetalert pewnie jakieś prmisy trzeba zastosować
  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   if ((this.addProductForm.value.price !== null
  //       || this.addProductForm.value.title !== null
  //       || this.addProductForm.value.desc !== null
  //       || this.addProductForm.value.image !== null) && !this.savedChanges) {
  //     return confirm('Do you want to discard the changes ??? ');
  //   } else {
  //     return true;
  //   }
  // }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this._discard.show();
    if ((this._addProductForm.value.price !== null
        || this._addProductForm.value.title !== null
        || this._addProductForm.value.desc !== null
        || this._addProductForm.value.image !== null) && !this._savedChanges) {
      return this._discardChanges;
    } else {
      return true;
    }
  }

  getCategoryNames() {
    this.showPublicData.getCategoryNames().subscribe(
      (response: string[]) => {
        this._categoryNames = response;
      },
      () => this._error.show()
    );
  }

  get addProductForm(): NgForm {
    return this._addProductForm;
  }

  set addProductForm(value: NgForm) {
    this._addProductForm = value;
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

  get discard(): SwalComponent {
    return this._discard;
  }

  set discard(value: SwalComponent) {
    this._discard = value;
  }

  get productData(): ProductDataAmount {
    return this._productData;
  }

  set productData(value: ProductDataAmount) {
    this._productData = value;
  }

  get savedChanges(): boolean {
    return this._savedChanges;
  }

  set savedChanges(value: boolean) {
    this._savedChanges = value;
  }

  get categoryNames(): string[] {
    return this._categoryNames;
  }

  set categoryNames(value: string[]) {
    this._categoryNames = value;
  }

  get discardChanges(): boolean {
    return this._discardChanges;
  }

  set discardChanges(value: boolean) {
    this._discardChanges = value;
  }

  get photoName(): string {
    return this._photoName;
  }

  set photoName(value: string) {
    this._photoName = value;
  }

  get photoSize(): number {
    return this._photoSize;
  }

  set photoSize(value: number) {
    this._photoSize = value;
  }
}
