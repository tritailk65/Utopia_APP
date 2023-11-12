import { CreateComment, EditComment } from '../types/comment-type';
import { PostCreate } from '../types/post-type';
import { deleteAxios, getAxios, postAxios, putAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const getListCommentByPostId = async (id: number) => {
    try {
        const path = `${backend.commentController}/Post/${id}`;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createNewComment = async (post: CreateComment) => {
    try {
        const path = `${backend.commentController}/UserComment`;
        const response = await postAxios(path, post);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createReplyComment = async (post: CreateComment) => {
    try {
        const path = `${backend.commentController}/ReplyComment`;
        const response = await postAxios(path, post);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const editCommentService = async (post: EditComment, commentId: number) => {
    try {
        const path = `${backend.commentController}/${commentId}/EditComment`;
        const response = await putAxios(path, post);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const deleteCommentService = async (commentId: number) => {
    try {
        const path = `${backend.commentController}/${commentId}`;
        const response = await deleteAxios(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
