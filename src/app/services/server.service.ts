import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDataAmount} from '../model/product-data-amount';
import {ProductMapper} from '../model/dto/product-mapper';
import {ProductAmountDto} from '../model/dto/product-amount-dto';
import {ProductMarkDto} from '../model/dto/product-mark-dto';
import {Comment} from '../model/comment';
import {CommentMapper} from '../model/dto/comment-mapper';
import {Server} from '../model/server';

@Injectable()
export class ServerService {
  private productAmountDto: ProductAmountDto;
  private commentMapper: CommentMapper = new CommentMapper();

  constructor(private http: HttpClient,
              private mapper: ProductMapper) {
  }

  onProductRemoved = new EventEmitter<ProductDataAmount>();
  onProductUpdated = new EventEmitter<ProductDataAmount>();

  addNewProduct(product: ProductDataAmount) {
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.post(Server.address + 'product/save',
      this.productAmountDto);
  }


  removeProduct(id: number) {
    const idSting = String(id);
    const params = {id: idSting};

    return this.http.delete(Server.address + 'product/deleteProduct', {
      params: params
    });
  }

  updateProduct(product: ProductDataAmount) {
    this.productAmountDto = this.mapper.mapToProductAmountDto(product);
    return this.http.put(Server.address + 'product/updateProduct', this.productAmountDto);
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
}
