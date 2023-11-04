import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { openCommentModalReducer, closeCommentModalReducer } from '../redux/reducers/CommentModalSlice';

const useCommentModal = () => {
    const commentModalState = useSelector((state: RootState) => state.commentModal);
    const dispatch = useDispatch<AppDispatch>();
    const openCommentModal = (id: number) => {
        dispatch(openCommentModalReducer(id));
    };

    const closeCommentModal = () => {
        dispatch(closeCommentModalReducer());
    };

    return { commentModalState, openCommentModal, closeCommentModal };
};

export default useCommentModal;