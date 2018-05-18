import {EventEmitter, Injectable} from '@angular/core';
import {ProductData} from '../model/product-data';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {ProductDataAmount} from '../model/product-data-amount';
import {ProductMapper} from '../model/dto/product-mapper';
import {ProductDto} from '../model/dto/product-dto';
import {ProductAmountDto} from '../model/dto/product-amount-dto';
import {ProductMarkDto} from '../model/dto/product-mark-dto';
import {Comment} from '../model/comment';
import {CommentMapper} from '../model/dto/comment-mapper';
import {Server} from '../model/server';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServerService {
  private productDto: ProductDto;
  private productAmountDto: ProductAmountDto;
  private commentMapper: CommentMapper = new CommentMapper();

  constructor(private http: HttpClient,
              private mapper: ProductMapper) {
  }

  addNewProduct(product: ProductDataAmount) {
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.post(Server.address + 'product/save',
      this.productAmountDto);
  }

  onTaskRemoved = new EventEmitter<ProductDataAmount>();
  onTaskUpdated = new EventEmitter<ProductData>();

  removeProduct(id: number) {
    const idSting = String(id);
    const params = {id: idSting};

    return this.http.delete(Server.address + 'product/deleteProduct', {
      params: params
    });
  }

  updateProduct(product: ProductDataAmount) {
    console.log(product);
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    console.log(this.productAmountDto);
    console.log('--------------------');
    console.log(product);
    return this.http.put(Server.address + 'product/updateProduct', product);
  }

  markProduct(productMarkDto: ProductMarkDto) {
    return this.http.put(Server.address + 'product/mark', productMarkDto
    );
  }

  addComment(comment: Comment) {
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.post(Server.address + 'comment/add', commentDto
    );
  }

  removeComment(commentId) {
    const params = {commentId: commentId};

    return this.http.delete(Server.address + 'comment/remove', {
      params: params
    });
  }

  editComment(comment: Comment) {
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.put(Server.address + 'comment/update', commentDto);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/upload/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
