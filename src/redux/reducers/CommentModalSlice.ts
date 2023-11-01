import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentModalSliceProps {
    postId: number;
    show: boolean;
}

const initialState: CommentModalSliceProps = {
    show: false,
    postId: 0,
};

const CommentModalSlice = createSlice({
    name: 'CommentModalSlice',
    initialState,
    reducers: {
        closeCommentModalReducer: (state) => {
            state.postId = 0;
            state.show = false;
        },
        openCommentModalReducer: (state, action: PayloadAction<number>) => {
            state.postId = action.payload;
            state.show = true;
        },
    },
});

export const { closeCommentModalReducer, openCommentModalReducer } = CommentModalSlice.actions;

export default CommentModalSlice.reducer;
