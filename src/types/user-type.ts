export type UserInfo = {
    id: number;
    code: string;
    userName: string;
    fullName: string;
    bio: string;
    createAt: Date;
    updateAt: Date;
    avatarPath: string;
    phone: number;
    email: string;
    gender: string;
    website: string;
    postCount: number;
    followerCount: number;
    followingCount: number;
};

export interface UserPostForViewer {
    id: number;
    userName: string;
    createAt: Date;
    updateAt: Date;
    avatarPath?: string | null;
    website?: string | null;
}
