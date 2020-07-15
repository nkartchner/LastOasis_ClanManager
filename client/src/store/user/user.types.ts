import { User } from "../../models";

// export const LOAD_USER = "LOAD_USER";
// export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
// export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
// export const REMOVE_USER = "REMOVE_USER";
// export const UPDATE_USER = "UPDATE_USER";

// interface LoadUserAction {
//     type: typeof LOAD_USER;
// }
// interface LoadUserSuccessAction {
//     type: typeof LOAD_USER_SUCCESS;
//     payload: User;
// }
// interface LoadUserFailureAction {
//     type: typeof LOAD_USER_FAILURE;
//     payload: { error: any };
// }

// interface RemoveUserAction {
//     type: typeof REMOVE_USER;
// }

// interface UpdateUserAction {
//     type: typeof UPDATE_USER;
//     payload: User;
// }

export interface UserState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

// export type UserActionTypes =
//     | LoadUserAction
//     | LoadUserSuccessAction
//     | LoadUserFailureAction
//     | RemoveUserAction
//     | UpdateUserAction;
