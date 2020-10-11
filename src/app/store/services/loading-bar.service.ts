import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../reducers/index';
import * as loadingStore from '../reducers/loading-bar.reducers';
import * as loadingActions from '../actions/loading-bar.actions';

const selectFeature = (state: State) => state.loading;

const selectLoadingData = createSelector(
  selectFeature,
  (state: loadingStore.State) => state.loading
);

@Injectable({
  providedIn: 'root',
})
export class LoadingStoreService {

  constructor(
    private store: Store
  ) { }

  addLoading(): void {
    this.store.dispatch(new loadingActions.AddLoading());
  }

  removeLoading(): void {
    this.store.dispatch(new loadingActions.RemoveLoading());
  }

  isLoading(): Observable<boolean> {
    return this.store.select(selectLoadingData).pipe(
      map((value) => {
        return Boolean(value);
      })
    );
  }
}
