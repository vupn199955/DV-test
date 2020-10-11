import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from './user.reducers';
import * as fromLoading from './loading-bar.reducers';

export interface State {
  user: fromUser.State;
  loading: fromLoading.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  loading: fromLoading.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
