import { configureStore } from '@reduxjs/toolkit';
import CommentModalReducer from './reducers/CommentModalSlice';
import FollowModalReducer from './reducers/FollowModalSlice';
import CreatePostModalReducer from './reducers/CreatePostModalSlice';
import PostingCommentReducer from './reducers/PostingCommentSlice';
export const store = configureStore({
    reducer: {
        commentModal: CommentModalReducer,
        followModal: FollowModalReducer,
        createPostModal: CreatePostModalReducer,
        postingComment: PostingCommentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
