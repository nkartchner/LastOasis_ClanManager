import { Clan } from "./clan";

export interface Post {
    id: number;
    clanId: number;
    userId: number;
    content: string;
    imgUrl?: string;
    clan?: Clan;
    createdAt: Date;
    updateAt: Date;
}
