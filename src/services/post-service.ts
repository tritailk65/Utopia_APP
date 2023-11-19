import { PostCreate } from '../types/post-type';
import { getAxios, postAxios, postAxiosFile } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const getListPostForViewer = async (id: number, page: number) => {
    try {
        const path = `${backend.postController}/getListPostForViewer/page=${page}`;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getListPostProfile = async (name: string | undefined, page: number) => {
    try {
        const path = `${backend.postController}/GetListPostProfile/UserName=${name}&page=${page}`;

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

export const uploadPostImage = async (id: number, file: string | Blob) => {
    try {
        const path = `${backend.postController}/UploadImage/${id}`;
        const formData = new FormData();
        if (typeof file === 'string') {
            // If it's a base64 string, convert it to a Blob
            const blob = await fetch(file).then((r) => r.blob());
            formData.append('avatar', blob);
        } else {
            formData.append('avatar', file);
        }

        const response = await postAxiosFile(path, formData);
        return response;
    } catch (e) {
        console.log(e);
    }
};
