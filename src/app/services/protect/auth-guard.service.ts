import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LogingService} from '../loging.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private logingService: LogingService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.logingService.isAuthentication()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            alert('To continue log in');
            this.router.navigate(['/']);
          }
        }
      );
  }
}
