import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {isNull} from 'util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') === 'null') {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .append('Accept', 'application/json');
      const copiedReq = req.clone({headers: headers});
      return next.handle(copiedReq);
    } else {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .append('Accept', 'application/json')
        .append('Authorization', localStorage.getItem('token'));
      const copiedReq = req.clone({headers: headers});
      return next.handle(copiedReq);
    }
  }
}

