import { UserInfo } from './user-type';

export type FollowingReponse = {
    id: number;
    dateFollow: Date;
    user: UserInfo;
    userSourceId: number;
    userTargetId: number;
};
