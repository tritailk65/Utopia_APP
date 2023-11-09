import { PostCreate } from '../types/post-type';
import { getAxios, postAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const getListPostForViewer = async (id: number, page: number) => {
    try {
        const path = `${backend.postController}/getListPostForViewer/id=${id}&page=${page}`;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createNewPost = async (post: PostCreate) => {
    try {
        const path = `${backend.postController}`;
        const response = await postAxios(path, post);
        return response;
    } catch (e) {
        console.log(e);
    }
};
