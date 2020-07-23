import { AppThunkAction } from "..";
import { RouterAction, push } from "connected-react-router";
import Axios, { AxiosError } from "axios";
import { User } from "../../models";
import { setAxiosDefaultToken } from "../../config/axios.config";
import { History } from "history";
import {
  Credentials,
  UserActions,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  UPDATE_USER,
  LOGOUT,
  CLEAR_ERROR,
} from "./user.types";

export const loginFailed = (error: string): UserActions => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const loginSuccess = (user: User): UserActions => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const updateUser = (user: User): UserActions => ({
  type: UPDATE_USER,
  payload: user,
});

export const removeUser = (): UserActions => ({
  type: LOGOUT,
});

export const clearError = (): UserActions => ({
  type: CLEAR_ERROR,
});
export const login = (
  credentials: Credentials,
  history: History
): AppThunkAction<UserActions | RouterAction> => (dispatch, getState) => {
  const appState = getState();
  if (appState && appState.user) {
    Axios.post<{ user: User; message: string }>("/api/auth/login", credentials)
      .then(({ data }) => {
        localStorage.setItem("Token", data.user.token);
        setAxiosDefaultToken();
        dispatch(loginSuccess(data.user));
        if (data.user.clanId) {
          history.push(`/clans/${data.user.clanId}/posts`);
        } else {
          history.push("/clans");
        }
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.hasOwnProperty("data")) {
          if (
            error.response.data.hasOwnProperty("message") &&
            error.response.data.message.length > 0
          ) {
            dispatch(loginFailed(error.response.data.message));
          }
        }
        dispatch(
          loginFailed(
            error.response?.data.message ||
              error.message ||
              "Internal server error. Please try again"
          )
        );
      });
  }
};
export const logout = (
  history: History
): AppThunkAction<UserActions | RouterAction> => (dispatch) => {
  localStorage.clear();
  dispatch(removeUser());
  history.replace({ pathname: "/login" });
};
export const checkAuth = (
  history: History
): AppThunkAction<UserActions | RouterAction> => (dispatch, getState) => {
  const appState = getState();
  if (appState) {
    const token = localStorage.getItem("Token");
    if (token) {
      Axios.post<{ user: User }>("/api/auth/checkauth", {
        Secret: token,
      })
        .then(({ data }) => {
          dispatch(loginSuccess(data.user));
          if (data.user.clanId) {
            history.push(`/clans/${data.user.clanId}/posts`);
          } else {
            history.push("/clans");
          }
        })
        .catch(() => history.push("/login"));
    } else {
      history.push("/login");
    }
  }
};
