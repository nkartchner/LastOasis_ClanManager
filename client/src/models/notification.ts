import { User } from "./user";

export enum NotificationType {
    CLAN,
    MESSAGE,
    GENERAL,
}

export interface Notification {
    id: number;
    text: string;
    type: NotificationType;
    unread: boolean;
    createdAt?: Date;
    userId: number;
    user?: User;
}
