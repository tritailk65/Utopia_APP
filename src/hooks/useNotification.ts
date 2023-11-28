import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { cleanNotification, addNotification } from '../redux/reducers/NotificationSlice';
import { Message } from '../types/message-type';

const useNotification = () => {
    const notificationState = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch<AppDispatch>();
    const clearNotification = () => {
        dispatch(cleanNotification());
    };

    const addMoreNotification = (noti: Message) => {
        console.log(noti);

        dispatch(addNotification(noti));
    };

    return { notificationState, clearNotification, addMoreNotification };
};

export default useNotification;
