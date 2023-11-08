import { UserInfo } from './user-type';

export type RequestFollowReponse = {
    id: number;
    isPending: number;
    requestDate: Date;
    userSrc: UserInfo;
    userSourceId: number;
    userTargetId: number;
};
