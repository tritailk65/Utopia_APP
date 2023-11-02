import { getAxios, postAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const postFavoriteService = async (userId: number, postId: number) => {
    try {
        const path = `${backend.postFavoriteController}/userid=${userId}&postid=${postId}`;
        const response = await postAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getListPostFavoriteByUser = async (userId: number) => {
    try {
        const path = `${backend.postFavoriteController}/User/${userId}`;
        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};
