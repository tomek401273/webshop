import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {finalize, tap} from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
// export class LoggingInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.responseType === 'json') {
      req = req.clone({responseType: 'text'});

      return next.handle(req).map(response => {
        if (response instanceof HttpResponse) {
          response = response.clone<any>({body: JSON.parse(response.body)});
        }
        return response;
      });
    }
    return next.handle(req);
  }
}


