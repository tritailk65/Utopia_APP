import { UserPostForViewer } from './post-type';

export interface Comment {
    id: number;
    userId: number;
    postId: number;
    comment: string;
    date: Date;
    totals: number;
    cmtOwner: boolean;
    user: UserPostForViewer;
    replies: ReplyComment[];
}

export interface ReplyComment {
    id: number;
    userId: number;
    postId: number;
    comment: string;
    parentId: number;
    cmtOwner: boolean;
    date: Date;
    user: UserPostForViewer;
}

export interface CreateComment {
    userId: number;
    postId: number;
    comment: string;
    parentId: number;
}

export interface EditComment {
    idUser: number;
    comment: string;
}
