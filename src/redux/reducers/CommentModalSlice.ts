import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostForViewer } from '../../types/post-type';

interface CommentModalSliceProps {
    post: PostForViewer | null;
    show: boolean;
}

const initialState: CommentModalSliceProps = {
    show: false,
    post: null,
};

const CommentModalSlice = createSlice({
    name: 'CommentModalSlice',
    initialState,
    reducers: {
        closeCommentModalReducer: (state) => {
            state.post = null;
            state.show = false;
        },
        openCommentModalReducer: (state, action: PayloadAction<PostForViewer>) => {
            state.post = action.payload;
            state.show = true;
        },
    },
});

export const { closeCommentModalReducer, openCommentModalReducer } = CommentModalSlice.actions;

export default CommentModalSlice.reducer;
