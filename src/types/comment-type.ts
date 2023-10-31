import { UserPostForViewer } from './post-type';

export interface Comment {
    id: number;
    userId: number;
    postId: number;
    comment: string;
    date: Date;
    totals: number;
    user: UserPostForViewer;
    replies: ReplyComment[];
}

export interface ReplyComment {
    id: number;
    userId: number;
    postId: number;
    comment: string;
    parentId: number;
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
    userId: number;
    comment: string;
}
