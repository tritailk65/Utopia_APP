import { ImageType } from './image-type';

export type PostCreate = {
    userId: number;
    title: string;
    content: string;
    isHideLike: number;
    commentStat: number;
};

export type PostEdit = {
    postId: number;
    title: string;
    isHideLike: number;
    commentStat: number;
};

export interface PostForViewer {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    time: number;
    isHideLike: number;
    commentStat: number;
    isLiked: boolean;
    isSaved: boolean;
    isOwner: boolean;
    datePublished: Date;
    lastUpdate: Date;
    user: UserPostForViewer;
    images: ImageType[];
}

export interface UserPostForViewer {
    id: number;
    userName: string;
    createAt: Date;
    updateAt: Date | null;
    avatarPath: string;
    website: string | null;
}
