import { Injectable, NgZone } from '@angular/core';
import {CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GoogleAuth2Service } from '../services/google.services';
import { UserStoreService } from '../store/services/user.service';

@Injectable()

export class LoginGaurdMiddleware implements CanActivate {
  constructor(
    private route: Router,
    private userStoreService: UserStoreService,
    private ggService: GoogleAuth2Service,
    private ngZone: NgZone
  ) {}

  canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return true;
  }
}
