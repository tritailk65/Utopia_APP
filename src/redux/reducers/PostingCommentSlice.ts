import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateComment } from '../../types/comment-type';
interface PostingCommentType {
    data: CreateComment;
    type: string;
}

const initialState: PostingCommentType = {
    data: {
        userId: 0,
        parentId: -1,
        comment: '',
        postId: 0,
    },
    type: 'comment',
};

const PostingCommentSlice = createSlice({
    name: 'PostingCommentSlice',
    initialState,
    reducers: {
        focusCommentReducer: (state, action: PayloadAction<CreateComment>) => {
            state.data.userId = action.payload.userId;
            state.data.postId = action.payload.postId;
            state.data.parentId = -1;
            state.data.comment = action.payload.comment;
            state.type = 'comment';
        },
        focusReplyReducer: (state, action: PayloadAction<CreateComment>) => {
            state.data.userId = action.payload.userId;
            state.data.postId = action.payload.postId;
            state.data.parentId = action.payload.parentId;
            state.data.comment = action.payload.comment;
            state.type = 'reply';
        },
        clearCommentReducer: (state) => {
            state.data.userId = 0;
            state.data.postId = 0;
            state.data.parentId = -1;
            state.data.comment = '';
            state.type = 'comment';
        },
    },
});

export const { focusCommentReducer, focusReplyReducer, clearCommentReducer } = PostingCommentSlice.actions;

export default PostingCommentSlice.reducer;
