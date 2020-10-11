import { Action } from '@ngrx/store';
import { SocialUser } from 'src/app/services/google.services';

export enum UserActionTypes {
  Login = '[Attendees Page] Load Attendees',
  Logout = '[Attendees Page] Load Attendees Success',
}

export class UserLogin implements Action {
  readonly type = UserActionTypes.Login;
  constructor(public payload: SocialUser) {}
}

export class UserLogout implements Action {
  readonly type = UserActionTypes.Logout;
}

export type UserActions =
  | UserLogin
  | UserLogout;
