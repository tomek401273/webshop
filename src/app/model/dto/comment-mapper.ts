import {Comment} from '../comment';
import {CommentDto} from './comment-dto';

export class CommentMapper {
  mapToCommentDto(comment: Comment) {
    const commentDto: CommentDto = new CommentDto(comment.id, comment.login, comment.message, comment.productId);
    return commentDto;
  }
}
