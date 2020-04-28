import { Clan } from "./clan";
// const test: any = {};
// const user: User = test;

export interface User {
    firstName: string;
    lastName: string;
    clanId: number | null;
    clan: Clan | null;
    id: number;
    token: string;
    role: string;
    email: string;
    password: string;
}
export enum ClanRoles {
    Visitor,
    Solo,
    Founder,
    Leader,
    Officer,
    Member,
}
