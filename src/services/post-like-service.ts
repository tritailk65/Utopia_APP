import { getAxios, postAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const postLikeService = async (postId: number) => {
    try {
        const path = `${backend.postLikeController}/PostId=${postId}`;
        const response = await postAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getListPostLikeByUser = async (userId: number) => {
    try {
        const path = `${backend.postLikeController}/User/${userId}`;
        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};
