import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { openCommentModalReducer, closeCommentModalReducer } from '../redux/reducers/CommentModalSlice';
import { PostForViewer } from '../types/post-type';

const useCommentModal = () => {
    const commentModalState = useSelector((state: RootState) => state.commentModal);
    const dispatch = useDispatch<AppDispatch>();
    const openCommentModal = (post: PostForViewer) => {
        dispatch(openCommentModalReducer(post));
    };

    const closeCommentModal = () => {
        dispatch(closeCommentModalReducer());
    };

    return { commentModalState, openCommentModal, closeCommentModal };
};

export default useCommentModal;
