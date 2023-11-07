import { configureStore } from '@reduxjs/toolkit';
import CommentModalReducer from './reducers/CommentModalSlice';
import FollowModalReducer from './reducers/FollowModalSlice';
import CreatePostModalReducer from './reducers/CreatePostModalSlice';

export const store = configureStore({
    reducer: {
        commentModal: CommentModalReducer,
        followModal: FollowModalReducer,
        createPostModal: CreatePostModalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
