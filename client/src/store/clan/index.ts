import { Reducer } from "redux";
import { ApplicationState } from "..";
import { Selector, createSelector } from "reselect";

const SELECT_CLAN = "SELECT_CLAN";
const DESELECT_CLAN = "DESELECT_CLAN";

interface SelectClanAction {
    type: typeof SELECT_CLAN;
    payload: number;
}

interface DeSelectClanAction {
    type: typeof DESELECT_CLAN;
}

type ClanActions = SelectClanAction | DeSelectClanAction;

export interface ClanState {
    clanId: number | null;
}

const initialState: ClanState = {
    clanId: null,
};

export const selectClan = (clanId: number) => ({
    type: SELECT_CLAN,
    payload: clanId,
});

export const deSelectClan = () => ({
    type: DESELECT_CLAN,
});

export const reducer: Reducer<ClanState> = (
    state: ClanState = initialState,
    action: ClanActions
): ClanState => {
    switch (action.type) {
        case SELECT_CLAN:
            return { clanId: action.payload };
        case DESELECT_CLAN:
            return { clanId: null };
        default:
            return state;
    }
};

export const selectClanState = (state: ApplicationState): ClanState =>
    state.clan!;

export const selectSelectedClan: Selector<
    ApplicationState,
    number | null
> = createSelector([selectClanState], (state) => state.clanId);
