import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/message-type';

interface NotificationSliceProps {
    data: Message[] | null;
    count: number;
}

const initialState: NotificationSliceProps = {
    data: null,
    count: 0,
};

const NotificationSlice = createSlice({
    name: 'NotificationSlice',
    initialState,
    reducers: {
        cleanNotification: (state) => {
            state.data = null;
            state.count = 0;
        },
        addNotification: (state, action: PayloadAction<Message>) => {
            state.data = state.data ? [...state.data, action.payload] : [action.payload];
            state.count = state.data ? state.data.length : 0;
        },
    },
});

export const { cleanNotification, addNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
