import { configureStore } from '@reduxjs/toolkit';
import CommentModalReducer from './reducers/CommentModalSlice';
export const store = configureStore({
    reducer: {
        commentModal: CommentModalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
