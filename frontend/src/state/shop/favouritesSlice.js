import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  favouriteItems: [],
  isLoading: false,
};

const backUrl = import.meta.env.VITE_BACKEND_URL;


export const addToFavourites = createAsyncThunk(
  "favourites/addToFavourites",
  async ({ userId, productId }) => {
    const response = await axios.post(
      `${backUrl}/api/favourites/add`,
      {
        userId,
        productId,
      }
    );

    return response.data;
  }
);

export const fetchFavouriteItems = createAsyncThunk(
  "favourites/fetchFavouriteItems",
  async (userId) => {
    const response = await axios.get(
      `${backUrl}/api/favourites/get/${userId}`
    );

    return response.data;
  }
);


export const deleteFavouriteItem = createAsyncThunk(
  "favourites/deleteFavouriteItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${backUrl}/api/favourites/remove/${userId}/${productId}`
    );

    return response.data;
  }
);


const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favouriteItems = action.payload.data;
      })
      .addCase(addToFavourites.rejected, (state) => {
        state.isLoading = false;
        state.favouriteItems = [];
      })
      .addCase(fetchFavouriteItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavouriteItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favouriteItems = action.payload.data;
      })
      .addCase(fetchFavouriteItems.rejected, (state) => {
        state.isLoading = false;
        state.favouriteItems = [];
      })
      .addCase(deleteFavouriteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFavouriteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favouriteItems = action.payload.data;
      })
      .addCase(deleteFavouriteItem.rejected, (state) => {
        state.isLoading = false;
        state.favouriteItems = [];
      })
  },
});

export default favouritesSlice.reducer;