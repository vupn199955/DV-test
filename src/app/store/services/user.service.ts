import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { State } from '../reducers/index';
import * as userStore from '../reducers/user.reducers';
import * as userActions from '../actions/user.actions';
import { SocialUser } from 'src/app/services/google.services';

const selectFeature = (state: State) => state.user;

const selectUserData = createSelector(
  selectFeature,
  (state: userStore.State) => state.user
);

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {

  constructor(
    private store: Store
  ) { }

  loginSuccess(user): void {
    this.store.dispatch(new userActions.UserLogin(user));
  }

  logoutSuccess(): void {
    this.store.dispatch(new userActions.UserLogout());
  }

  getUserData(): Observable<SocialUser> {
    return this.store.select(selectUserData);
  }

  isAuth(): Observable<boolean> {
    return this.getUserData().pipe(
      first(),
      map((user) => {
        return Boolean(user);
      })
    );
  }
}
