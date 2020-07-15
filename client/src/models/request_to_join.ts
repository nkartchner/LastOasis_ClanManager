import { Clan, User } from ".";

export interface RequestToJoin {
    id: number;
    reason: string;
    userId: number;
    user: User;
    clanId: number;
    clan: Clan;
    createdAt: Date;
}
