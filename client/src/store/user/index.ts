import { createSelector } from "reselect";
import { ApplicationState } from "..";
import { UserState } from "./user.types";
import { Selector } from "react-redux";
import { User } from "../../models";

export const selectUserState = (state: ApplicationState): UserState =>
  state.user!;

export const getUser: Selector<ApplicationState, User | null> = createSelector(
  [selectUserState],
  (state) => state.user
);

export const selectUser = createSelector([getUser], (user) => user);

export const selectIsAuthenticated: Selector<
  ApplicationState,
  boolean
> = createSelector<ApplicationState, UserState, boolean>(
  [selectUserState],
  (props2) => props2!.isAuthenticated
);

export const selectUserName: Selector<
  ApplicationState,
  string | null
> = createSelector([getUser], (user) =>
  user ? `${user.firstName} ${user.lastName}` : null
);

export const selectHasClan = createSelector([getUser], (user) =>
  Boolean(user && user.clanId)
);

export const selectClanId = createSelector([getUser], (user) =>
  user ? user.clanId : null
);

export const selectError = createSelector(
  [selectUserState],
  (state) => state.error
);
