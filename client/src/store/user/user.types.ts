import { User } from "../../models";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_USER = "UPDATE_USER";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOGIN_FAILED = "LOGIN_FAILED";

export interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
export interface LoginAction {
  type: typeof LOGIN;
  payload: Credentials;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface LoadUserAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
}

export interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: string;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type UserActions =
  | LoginAction
  | LogoutAction
  | LoadUserAction
  | UpdateUserAction
  | ClearErrorAction
  | LoginFailedAction;

export interface Credentials {
  Email: string;
  Password: string;
}
