import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { openEditPostModalReducer, closeEditPostModalReducer } from '../redux/reducers/EditPostModalSlice';
import { PostEdit } from '../types/post-type';
const useEditPostModal = () => {
    const editPostState = useSelector((state: RootState) => state.editPostModal);
    const dispatch = useDispatch<AppDispatch>();
    const openEditModal = (param: PostEdit) => {
        dispatch(openEditPostModalReducer(param));
    };

    const closeEditModal = () => {
        dispatch(closeEditPostModalReducer());
    };

    return { editPostState, openEditModal, closeEditModal };
};

export default useEditPostModal;
