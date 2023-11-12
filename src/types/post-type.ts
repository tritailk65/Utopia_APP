export type PostCreate = {
    userId: number;
    title: string;
    content: string;
    isHideLike: number;
    commentStat: number;
};

export interface PostForViewer {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    shareCount: number;
    isHideLike: number;
    commentStat: number;
    datePublished: Date;
    lastUpdate: Date;
    user: UserPostForViewer;
}

export interface UserPostForViewer {
    id: number;
    userName: string;
    createAt: Date;
    updateAt: Date | null;
    avatarPath: string | null;
    website: string | null;
}

export interface FollowingPostForViewer {
    id: number;
    userSourceId: number;
    userTargetId: number;
    dateFollow: Date;
}
