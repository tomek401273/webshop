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
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.post('http://localhost:8080/product/save',
      this.productAmountDto);
  }

  onTaskRemoved = new EventEmitter<ProductDataAmount>();
  onTaskUpdated = new EventEmitter<ProductData>();

  removeProduct(id: number) {
    const idSting = String(id);
    const params = {id: idSting};

    return this.http.delete('http://localhost:8080/product/deleteProduct', {
      params: params
    });
  }

  updateProduct(product: ProductDataAmount) {
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.put('http://localhost:8080/product/updateProduct', this.productAmountDto);
  }

  markProduct(productMarkDto: ProductMarkDto) {
    return this.http.put('http://localhost:8080/product/mark', productMarkDto
    );
  }

  addComment(comment: Comment) {
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.post('http://localhost:8080/comment/add', commentDto
    );
  }

  removeComment(commentId) {
    const params = {commentId: commentId};

    return this.http.delete('http://localhost:8080/comment/remove', {
      params: params
    });
  }

  editComment(comment: Comment) {
    const commentDto = this.commentMapper.mapToCommentDto(comment);
    return this.http.put('http://localhost:8080/comment/update', commentDto);
  }
}
