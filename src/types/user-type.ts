export type userInfo = {
    id: number;
    code: string;
    slug: string;
    userName: string;
    fullName: string;
    description: string;
    createDate: Date;
    updateDate: Date;
};

export interface UserPostForViewer {
    id: number;
    userName: string;
    createAt: Date;
    updateAt: Date;
    avatarPath?: string | null;
    website?: string | null;
}
export type UserAvatar = {
    avatar: string;
};
