import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { updatePostData, getPostByIdThunk } from '../redux/reducers/DetailPostSlice';
import { PostForViewer } from '../types/post-type';

const useDetailPost = () => {
    const postState = useSelector((state: RootState) => state.detailPost);
    const dispatch = useDispatch<AppDispatch>();

    const updatePost = (param: PostForViewer) => {
        dispatch(updatePostData(param));
    };

    const fetchData = (id: number) => {
        dispatch(getPostByIdThunk(id));
    };

    return { postState, updatePost, fetchData };
};

export default useDetailPost;
