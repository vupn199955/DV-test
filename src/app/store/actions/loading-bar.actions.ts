import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
  AddLoading = '[Loading] AddLoading',
  RemoveLoading = '[Loading] RemoveLoading',
}

export class AddLoading implements Action {
  readonly type = LoadingActionTypes.AddLoading;
}

export class RemoveLoading implements Action {
  readonly type = LoadingActionTypes.RemoveLoading;
}

export type LoadingActions =
  | RemoveLoading
  | AddLoading;
