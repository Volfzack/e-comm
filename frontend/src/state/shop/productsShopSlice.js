import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    productsList: [], 
};

const backUrl = import.meta.env.VITE_BACKEND_URL;


export const getProductsShop = createAsyncThunk('/product/getProductsShop', async () => {
    const result = await axios.get(`${backUrl}/api/product/all`);

    return result?.data
});

export const getSingleProductShop = createAsyncThunk('/product/getSingleProductShop', async (id) => {
    const result = await axios.get(`${backUrl}/api/product/get/${id}`);

    return result?.data
});


const productsShopSlice = createSlice({
    name: "productsShopList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductsShop.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsList = action.payload;
            })
            .addCase(getProductsShop.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getSingleProductShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProductShop.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsList = action.payload;
            })
            .addCase(getSingleProductShop.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
});

export default productsShopSlice.reducer;