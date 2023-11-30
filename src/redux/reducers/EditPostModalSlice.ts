import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostEdit } from '../../types/post-type';

interface EditPostSliceProps {
    postId: number;
    title: string;
    isHideLike: number;
    commentStat: number;
    alert: boolean;
    show: boolean;
}

const initialState: EditPostSliceProps = {
    show: false,
    postId: 0,
    title: '',
    alert: true,
    isHideLike: 0,
    commentStat: 0,
};

const EditPostModalSlice = createSlice({
    name: 'EditPostModalSlice',
    initialState,
    reducers: {
        closeEditPostModalReducer: (state) => {
            state.postId = 0;
            state.title = '';
            state.commentStat = 0;
            state.isHideLike = 0;
            state.show = false;
            state.alert = true;
        },
        openEditPostModalReducer: (state, action: PayloadAction<PostEdit>) => {
            state.postId = action.payload.postId;
            state.title = action.payload.title;
            state.isHideLike = action.payload.isHideLike;
            state.commentStat = action.payload.commentStat;
            state.alert = action.payload.alert;
            state.show = true;
        },
    },
});

export const { closeEditPostModalReducer, openEditPostModalReducer } = EditPostModalSlice.actions;

export default EditPostModalSlice.reducer;
