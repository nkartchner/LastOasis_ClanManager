import { User, Allegiance } from ".";
import { RequestToJoin } from "./request_to_join";

export interface Clan {
    id: number;
    name: string;
    color: string;
    flag: string;
    description: string;
    members: User[];
    requests: RequestToJoin[];
    allegiances: Allegiance[];
}
