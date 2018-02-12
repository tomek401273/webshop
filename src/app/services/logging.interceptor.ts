import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        console.log('Logging interceptor: ', event);

        console.log('headers Access-Control-Allow-Origin: ' + req.headers.get('Access-Control-Allow-Origin'));
        console.log('headers Content-Type: ' + req.headers.get('Content-Type'));
        console.log('headers Access-Control-Allow-Methods: ' + req.headers.get('Access-Control-Allow-Methods'));
        console.log('headers Access-Control-Allow-Headers: ' + req.headers.get('Access-Control-Allow-Headers'));
        console.log('Authorization: ' + req.headers.get('Authorization'));
        console.log(req.headers);

        console.log('url: ' + req.url);
        console.log('body login: ' + req.body.login);
        console.log('body password: ' + req.body.password);
        console.log('params: ' + req.params);
        console.log('method: ' + req.method);
        console.log('responseType: ' + req.responseType);
        console.log('reportProgres: ' + req.reportProgress);
        return next.handle(req);
      }
    )
  }

}
