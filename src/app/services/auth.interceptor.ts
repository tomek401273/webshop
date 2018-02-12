import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor () { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor!!!' + req);
    console.log('headers Access-Control-Allow-Origin: ' + req.headers.get('Access-Control-Allow-Origin'));
    console.log('headers Content-Type: ' + req.headers.get('Content-Type'));
    console.log('headers Access-Control-Allow-Methods: ' + req.headers.get('Access-Control-Allow-Methods'));
    console.log('headers Access-Control-Allow-Headers: ' + req.headers.get('Access-Control-Allow-Headers'));

    console.log('url: ' + req.url);
    console.log('body login: ' + req.body.login);
    console.log('body password: ' + req.body.password);
    console.log('params: ' + req.params);
    console.log('method: ' + req.method);
    console.log('responseType: ' + req.responseType);
    console.log('reportProgres: ' + req.reportProgress);

    return next.handle(req);
  }

}
