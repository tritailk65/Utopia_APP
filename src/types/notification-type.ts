import { userInfo } from './user-type';

export type NotificationThisWeek = {
    userId: number;
    sourceId: number;
    context: string;
    updateAt: Date;
    userSource: userInfo;
    userTarget: userInfo;
};
