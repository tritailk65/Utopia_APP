import { UserInfo, userNotiProps } from './user-type';

export type NotificationThisWeek = {
    userId: number;
    sourceId: number;
    context: string;
    updateAt: Date;
    userSource: userNotiProps;
};

export type NotificationThisMonth = {
    userId: number;
    sourceId: number;
    context: string;
    updateAt: Date;
    userSource: userNotiProps;
};

export type NotificationEarlier = {
    userId: number;
    sourceId: number;
    context: string;
    updateAt: Date;
    userSource: userNotiProps;
};
