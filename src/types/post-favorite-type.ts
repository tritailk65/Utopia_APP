export interface SavePostFavorite {
    id: number;
    postId: number;
    userId: number;
    dateFavorite: Date;
    action: string;
}
