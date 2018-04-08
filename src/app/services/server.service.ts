import {EventEmitter, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductData} from '../model/product-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductDataAmount} from '../model/product-data-amount';
import {ProductMapper} from '../model/dto/product-mapper';
import {ProductDto} from '../model/dto/product-dto';
import {ProductAmountDto} from '../model/dto/product-amount-dto';
import {ProductMarkDto} from '../model/dto/product-mark-dto';
import {Comment} from '../model/comment';
import {CommentMapper} from '../model/dto/comment-mapper';

@Injectable()
export class ServerService {
  private productDto: ProductDto;
  private productAmountDto: ProductAmountDto;
  private commentMapper: CommentMapper = new CommentMapper();

  constructor(private http: HttpClient,
              private mapper: ProductMapper) {
  }

  addNewProduct(product: ProductDataAmount) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);

    return this.http.post('http://localhost:8080/product/save',
      this.productAmountDto, {
        headers: headers
      });
  }

  onTaskRemoved = new EventEmitter<ProductDataAmount>();
  onTaskUpdated = new EventEmitter<ProductData>();

  removeProduct(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    const idSting = String(id);
    const params = {id: idSting};

    return this.http.delete('http://localhost:8080/product/deleteProduct', {
      headers: headers,
      params: params
    });
  }

  updateProduct(product: ProductDataAmount) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.put('http://localhost:8080/product/updateProduct', this.productAmountDto, {
      headers: headers
    });
  }

  markProduct(productMarkDto: ProductMarkDto) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));

    return this.http.put('http://localhost:8080/product/mark', productMarkDto, {
      headers: headers
    });
  }

  addComment(comment: Comment) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.post('http://localhost:8080/comment/add', commentDto, {
      headers: headers
    });
  }

  removeComment(commentId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const params = {commentId: commentId};

    return this.http.delete('http://localhost:8080/comment/remove', {
      headers: headers,
      params: params
    });
  }

  editComment(comment: Comment) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', localStorage.getItem('token'));
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.put('http://localhost:8080/comment/update', commentDto, {
      headers: headers
    });
  }

}
