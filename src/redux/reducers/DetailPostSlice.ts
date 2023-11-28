import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../../types/api-type';
import { PostForViewer } from '../../types/post-type';
import { getPostById } from '../../services/post-service';

interface detailPostState {
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    data: PostForViewer | null;
}

const initialState: detailPostState = {
    isLoading: false,
    isSuccess: true,
    message: '',
    data: null,
};

export const getPostByIdThunk = createAsyncThunk('post/getPostById', async (id: number) => {
    const response = await getPostById(id);
    console.log(response);

    return response;
});

export const detailPostSlice = createSlice({
    name: 'get-post-by-id',
    initialState,
    reducers: {
        updatePostData: (state, action: PayloadAction<PostForViewer>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = true;
            })
            .addCase(getPostByIdThunk.fulfilled, (state, action: PayloadAction<Response<PostForViewer>>) => {
                state.isLoading = false;
                state.isSuccess = action.payload?.Status === 200 ? true : false;
                state.message = action.payload?.Message;
                state.data = action.payload?.Data;
            })
            .addCase(getPostByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

export const { updatePostData } = detailPostSlice.actions;
export default detailPostSlice.reducer;
