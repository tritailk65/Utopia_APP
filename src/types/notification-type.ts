import { UserInfo } from './user-type';

export type NotificationItemType = {
    type: number;
    context: string;
    updateAt: Date;
    userSource: UserInfo;
};
