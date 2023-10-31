export type UserInfo = {
    id: number;
    code: string;
    userName: string;
    fullName: string;
    bio: string;
    createAt: Date;
    updateAt: Date;
    avatartPath: string;
    phone: number;
    email: string;
    gender: string;
    website: string;
};

export type userNotiProps = {
    id: number;
    userName: string;
    avatar: string;
    context: string;
    follower: string;
};
