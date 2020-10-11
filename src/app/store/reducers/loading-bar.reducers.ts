
import { LoadingActionTypes, LoadingActions } from '../actions/loading-bar.actions';

export interface State {
  loading: number;
}

export const intitalState: State = {
  loading: 0,
};

export function reducer(state = intitalState, action: LoadingActions): State {
  switch (action.type) {
    case LoadingActionTypes.RemoveLoading:
      {
        const loading = state.loading - 1;
        return {
          ...state,
          loading
        };
      }
    case LoadingActionTypes.AddLoading:
      {
        const loading = state.loading + 1;
        return {
          ...state,
          loading
        };
      }

    default: {
      return state;
    }
  }
}
