import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    user: {},
    isLoading: true,
}

const backUrl = import.meta.env.VITE_BACKEND_URL;

export const signUp = createAsyncThunk('/auth/register', async (data) => {
    const response = await axios.post(`${backUrl}/api/auth/register`, data, {
        withCredentials: true
    });

    return response.data;
});

export const loginUser = createAsyncThunk('/auth/login', async (data) => {
    const response = await axios.post(`${backUrl}/api/auth/login`, data, {
        withCredentials: true
    });

    return response.data;
});

export const logoutUser = createAsyncThunk('/auth/logout', async () =>  {
    const response = await axios.post(`${backUrl}/api/auth/logout`, {}, {
      withCredentials: true
    })

    return response.data
})

export const checkAuth = createAsyncThunk( "/auth/checkauth", async () => {
    const response = await axios.get(
      `${backUrl}/api/auth/check-auth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(signUp.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = true;
        })
        .addCase(signUp.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = state.user;
          state.isAuthenticated = true;
        })
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        });
    },
  });


export const { setUser } = authSlice.actions;
export default authSlice.reducer;