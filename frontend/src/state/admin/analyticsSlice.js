import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    analytics: [],
    isLoading: false,
    error: null,
};

const backUrl = import.meta.env.VITE_BACKEND_URL;

export const getAnalytics = createAsyncThunk('/analytics/getAnalytics', async () => {
    const result = await axios.get(`${backUrl}/api/admin/analytics/get`);

    return result?.data
});

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAnalytics.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAnalytics.fulfilled, (state, action) => {
            state.isLoading = false;
            state.analytics = action.payload;
          })
          .addCase(getAnalytics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
      },
});

export default analyticsSlice.reducer;