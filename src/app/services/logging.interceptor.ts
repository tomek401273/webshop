import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class LoggingInterceptor implements HttpInterceptor {

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(req).do(
  //     event => {
  //       return next.handle(req);
  //     }
  //   )
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.responseType == 'json') {
      req = req.clone({ responseType: 'text' });

      return next.handle(req).map(response => {
        if (response instanceof HttpResponse) {
          response = response.clone<any>({ body: JSON.parse(response.body) });
        }

        return response;
      });
    }

    return next.handle(req);
  }
}


