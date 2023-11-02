import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowModallSliceProps {
    usesrId: number;
    show: boolean;
}

const initialState: FollowModallSliceProps = {
    show: false,
    usesrId: 0,
};

const FollowModalSlice = createSlice({
    name: 'FollowModalSlice',
    initialState,
    reducers: {
        closeFollowModalReducer: (state) => {
            state.usesrId = 0;
            state.show = false;
        },
        openFollowModalReducer: (state, action: PayloadAction<number>) => {
            state.usesrId = action.payload;
            state.show = true;
        },
    },
});

export const { closeFollowModalReducer, openFollowModalReducer } = FollowModalSlice.actions;

export default FollowModalSlice.reducer;
