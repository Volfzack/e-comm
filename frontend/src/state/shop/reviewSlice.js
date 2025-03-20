import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reviewItems: [],
    isLoading: true,
};

const backUrl = import.meta.env.VITE_BACKEND_URL;

export const getReviews = createAsyncThunk('/reviews/getReviews', async (productId) => {
    const result = await axios.get(`${backUrl}/api/review/get/${productId}`);

    return result?.data
});

export const addReview = createAsyncThunk('/reviews/addReview', async (data) => {
    const result = await axios.post(`${backUrl}/api/review/create`, data);

    return result?.data
});

export const deleteReview = createAsyncThunk('/reviews/deleteReview', async (id, {userId}) => {
    const result = await axios.delete(`${backUrl}/api/review/delete/${id}`, {userId});

    return result?.data
});


const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getReviews.fulfilled, (state, action) => {
            state.reviewItems = action.payload;
            state.isLoading = false;
        })
        .addCase(getReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviewItems = [];
        })
    },
})

export default reviewSlice.reducer;