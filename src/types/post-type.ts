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
    updateAt: Date;
    avatarPath: string;
    website: string;
}
