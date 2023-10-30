export type userInfo = {
    id: number;
    code: string;
    slug: string;
    userName: string;
    fullName: string;
    description: string;
    createDate: Date;
    updateDate: Date;
    avatart: Blob;
};

export type userNotiProps = {
    id: number;
    userName: string;
    avatar: string;
    context: string;
    follower: string;
};
