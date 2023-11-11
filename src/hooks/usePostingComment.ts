import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { focusCommentReducer, focusReplyReducer, clearCommentReducer } from '../redux/reducers/PostingCommentSlice';
import { CreateComment } from '../types/comment-type';
import useGetUserInfo from './useGetUserInfo';

const usePostingComment = () => {
    const commentState = useSelector((state: RootState) => state.postingComment);
    const dispatch = useDispatch<AppDispatch>();
    const user = useGetUserInfo();

    const onFocusComment = (postId: number, comment: string) => {
        const action: CreateComment = {
            userId: user.id,
            postId,
            parentId: -1,
            comment,
        };
        dispatch(focusCommentReducer(action));
    };

    const onFocusReply = (postId: number, parentId: number, comment: string) => {
        const action: CreateComment = {
            userId: user.id,
            postId,
            parentId,
            comment,
        };
        dispatch(focusReplyReducer(action));
    };

    const onClearState = () => {
        dispatch(clearCommentReducer());
    };

    return { commentState, onFocusComment, onFocusReply, onClearState };
};

export default usePostingComment;
