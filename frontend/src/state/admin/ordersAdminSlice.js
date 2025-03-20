import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderAdminItems: [],
    isLoading: false,
};

const backUrl = import.meta.env.VITE_BACKEND_URL;


export const getOrdersAdmin = createAsyncThunk('/ordersAdmin/getOrdersAdmin', async () => {
    const result = await axios.get(`${backUrl}/api/admin/orders/get`);

    return result?.data
});

export const updateOrderStatusAdmin = createAsyncThunk('/ordersAdmin/updateOrderStatusAdmin', async ({orderId, status}) => {
    const result = await axios.put(`${backUrl}/api/admin/orders/update`, {orderId, status});

    return result?.data
})

export const deleteOrderAdmin = createAsyncThunk('/ordersAdmin/deleteOrderAdmin', async (orderId) => {
    const result = await axios.delete(`${backUrl}/api/admin/orders/delete/${orderId}`);

    return result?.data
})


const ordersAdminSlice = createSlice({
    name: "ordersAdminList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrdersAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderAdminItems = action.payload.data;
            })
            .addCase(getOrdersAdmin.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export default ordersAdminSlice.reducer;
