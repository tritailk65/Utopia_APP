import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatePostModalSliceProps {
    usesrId: number;
    show: boolean;
}

const initialState: CreatePostModalSliceProps = {
    show: false,
    usesrId: 0,
};

const CreatePostModalSlice = createSlice({
    name: 'CreatePostModalSlice',
    initialState,
    reducers: {
        closeCreatePostModalReducer: (state) => {
            state.usesrId = 0;
            state.show = false;
        },
        openCreatePostModalReducer: (state, action: PayloadAction<number>) => {
            state.usesrId = action.payload;
            state.show = true;
        },
    },
});

export const { closeCreatePostModalReducer, openCreatePostModalReducer } = CreatePostModalSlice.actions;

export default CreatePostModalSlice.reducer;
