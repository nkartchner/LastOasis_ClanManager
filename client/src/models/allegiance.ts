import { Clan } from ".";

export enum FriendOrFo {
    ALLY,
    ENEMY,
}
export interface Allegiance {
    id: number;
    clanId: number;
    clan: Clan;
    pending: boolean;
    accepted: boolean;
    clanId_2: number;
    otherClan: Clan;
    alliedOrNot: FriendOrFo;
}
