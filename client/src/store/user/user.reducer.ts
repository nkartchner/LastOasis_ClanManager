import { Reducer } from "redux";
import {
  UserActions,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  UPDATE_USER,
  LOGOUT,
  CLEAR_ERROR,
  LOGIN,
  UserState,
} from "./user.types";

export interface State extends UserState {}

const initialState: State = {
  isAuthenticated: false,
  error: null,
  user: null,
  isLoading: false,
};

export const reducer: Reducer<State> = (
  state: State = initialState,
  action: UserActions
): State => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGOUT:
      return initialState;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case LOGIN_FAILED:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
