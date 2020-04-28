import Axios, { AxiosError } from "axios";
import { Reducer } from "redux";
import { User } from "../../models";
import { AppThunkAction } from "..";
import { UserState } from "./user.types";
import { setAxiosDefaultToken } from "../../config/axios.config";
import { push, RouterAction } from "connected-react-router";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const UPDATE_USER = "UPDATE_USER";
const CLEAR_ERROR = "CLEAR_ERROR";
const LOGIN_FAILED = "LOGIN_FAILED";

interface LoginAction {
    type: typeof LOGIN;
    payload: Credentials;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface LoadUserAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
}

interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: User;
}

interface LoginFailedAction {
    type: typeof LOGIN_FAILED;
    payload: string;
}

interface ClearErrorAction {
    type: typeof CLEAR_ERROR;
}

type UserActions =
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
const initialState: UserState = {
    isAuthenticated: false,
    error: null,
    user: null,
    isLoading: false,
};

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

export const reducer: Reducer<UserState> = (
    state: UserState = initialState,
    action: UserActions
): UserState => {
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

        default:
            return state;
    }
};

export const actionCreators = {
    login: (
        credentials: Credentials
    ): AppThunkAction<UserActions | RouterAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.user) {
            Axios.post<{ user: User; message: string }>(
                "/api/auth/login",
                credentials
            )
                .then(({ data }) => {
                    localStorage.setItem("Token", data.user.token);
                    setAxiosDefaultToken();
                    dispatch(loginSuccess(data.user));
                    dispatch(push("/dashboard"));
                })
                .catch((error: AxiosError) => {
                    if (
                        error.response &&
                        error.response.hasOwnProperty("data")
                    ) {
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
    },
    logout: (): AppThunkAction<UserActions | RouterAction> => (dispatch) => {
        localStorage.clear();
        dispatch(removeUser());
        dispatch(push("/login"));
    },
    checkAuth: (): AppThunkAction<UserActions | RouterAction> => (
        dispatch,
        getState
    ) => {
        const appState = getState();
        if (appState) {
            const token = localStorage.getItem("Token");
            if (token) {
                Axios.post<{ user: User }>("/api/auth/checkauth", {
                    Secret: token,
                })
                    .then(({ data }) => {
                        dispatch(loginSuccess(data.user));
                        dispatch(push("/dashboard"));
                    })
                    .catch(() => dispatch(push("/login")));
            } else {
                dispatch(push("/login"));
            }
        }
    },
};
