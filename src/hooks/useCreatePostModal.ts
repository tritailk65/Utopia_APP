import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { openCreatePostModalReducer, closeCreatePostModalReducer } from '../redux/reducers/CreatePostModalSlice';

const useCreatePostModal = () => {
    const createPostModalState = useSelector((state: RootState) => state.createPostModal);
    const dispatch = useDispatch<AppDispatch>();
    const openCreatePostModal = (id: number) => {
        dispatch(openCreatePostModalReducer(id));
    };

    const closeCreatePostModal = () => {
        dispatch(closeCreatePostModalReducer());
    };

    return { createPostModalState, openCreatePostModal, closeCreatePostModal };
};

export default useCreatePostModal;
