import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: true,
    products: [], 
};

const backUrl = import.meta.env.VITE_BACKEND_URL;


export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
      const result = await axios.post(
        `${backUrl}/api/admin/products/add`,
        formData,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        }
      );
  
      return result?.data;
    }
  );

export const getProducts = createAsyncThunk('/products/getProducts', async () => {
    const result = await axios.get(`${backUrl}/api/admin/products/all`);

    return result?.data
});

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
    const result = await axios.delete(`${backUrl}/api/admin/products/delete/${id}`);

    return result?.data
});

export const updateProduct = createAsyncThunk('/products/updateProduct', async ({id,formData}) => {
    const result = await axios.put(`${backUrl}/api/admin/products/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }  
    });

    return result?.data
});

export const getSingleProduct = createAsyncThunk('/products/getSingleProduct', async (id) => {
    const result = await axios.get(`${backUrl}/api/admin/products/get/${id}`);

    return result?.data
});

export const getProductsByCategory = createAsyncThunk('/products/getProductsByCategory', async (category) => {
    const result = await axios.get(`${backUrl}/api/admin/products/category/${category}`);

    return result?.data
})

const ProductsSlice = createSlice({
    name: "productsList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
});

export default ProductsSlice.reducer;