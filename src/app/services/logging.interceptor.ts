import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        // console.log('headers Authorization: ' + req.headers.get('Authorization'));

        // console.log('url: ' + req.url);
        // console.log('body login: ' + req.body.login);
        // console.log('body password: ' + req.body.password);
        // console.log('params: ' + req.params);
        // console.log('responseType: ' + req.responseType);
        // console.log('reportProgres: ' + req.reportProgress);

        return next.handle(req);
      }
    )
  }

}
