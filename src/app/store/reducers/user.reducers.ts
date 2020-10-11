
import { SocialUser } from 'src/app/services/google.services';
import { UserActionTypes, UserActions } from '../actions/user.actions';

export interface State {
  user: SocialUser;
}

export const intitalState: State = {
  user: null,
};

export function reducer(state = intitalState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.Logout:
      {
        return {
          ...state,
          user: null
        };
      }
    case UserActionTypes.Login:
      {
        return {
          ...state,
          user: action.payload
        };
      }

    default: {
      return state;
    }
  }
}
