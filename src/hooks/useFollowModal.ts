import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { openFollowModalReducer, closeFollowModalReducer } from '../redux/reducers/FollowModalSlice';

const useFollowModal = () => {
    const followModalState = useSelector((state: RootState) => state.followModal);
    const dispatch = useDispatch<AppDispatch>();
    const openFollowModal = (id: number) => {
        dispatch(openFollowModalReducer(id));
    };

    const closeFollowModal = () => {
        dispatch(closeFollowModalReducer());
    };

    return { followModalState, openFollowModal, closeFollowModal };
};

export default useFollowModal;
