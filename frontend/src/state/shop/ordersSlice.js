import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderItems: [],
    isLoading: false,
};

const backUrl = import.meta.env.VITE_BACKEND_URL;


export const createOrderCod = createAsyncThunk('/orders/createOrderCod', async (data) => {
    const result = await axios.post(`${backUrl}/api/orders/create`, data);

    return result
})

export const createWithStripe = createAsyncThunk('/orders/createWithStripe', async (data) => {
    const result = await axios.post(`${backUrl}/api/orders/stripe`, data);

    return result;
})

export const getOrders = createAsyncThunk('/orders/getOrders', async (userId) => {
    const result = await axios.get(`${backUrl}/api/orders/get/${userId}`);

    return result?.data
})

export const getOrderDetails = createAsyncThunk('/orders/getOrderDetails', async(id) => {
    const result = await axios.get(`${backUrl}/api/orders/getOrderDetails/${id}`);

    return result?.data
})

export const cancelOrder = createAsyncThunk('/orders/cancelOrder', async(id) => {
    const result = await axios.put(`${backUrl}/api/orders/cancel/${id}`);

    return result?.data
})

const ordersShopSlice = createSlice({
    name:'shopOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderItems = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderItems = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export default ordersShopSlice.reducer;