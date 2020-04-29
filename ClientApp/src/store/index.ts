import * as User from "./user";
import * as Clan from "./clan";
import { RouterState } from "connected-react-router";
export interface ApplicationState {
    user: User.UserState | undefined;
    clan: Clan.ClanState | undefined;
    router: RouterState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    user: User.reducer,
    clan: Clan.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
}
