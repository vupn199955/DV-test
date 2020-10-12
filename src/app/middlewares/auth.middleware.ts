import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { UserStoreService } from '../store/services/user.service';

@Injectable()

export class AuthMiddleware implements CanActivate {
  constructor(
    private route: Router,
    private userStoreService: UserStoreService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.userStoreService.isAuth().pipe(
      first(),
      map((isAuth) => {
        if (!isAuth) {
          alert('You have to login fist!');
          this.route.navigate(['/login']);
          return false;
        }
        return isAuth;
      })
    );
  }
}
