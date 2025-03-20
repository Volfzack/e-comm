import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ProductsSlice from './admin/productsSlice';
import productsShopSlice from './shop/productsShopSlice';
import shopCartSlice from './shop/cartSlice';
import favouritesSlice from './shop/favouritesSlice';
import orderShopSlice from './shop/ordersSlice';
import ordersAdminSlice from './admin/ordersAdminSlice';
import shopReviewSlice from './shop/reviewSlice';
import analyticsSlice from './admin/analyticsSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        productsList: ProductsSlice,
        productsShopList: productsShopSlice,
        shopCart: shopCartSlice,
        favourites: favouritesSlice,
        shopOrders : orderShopSlice,
        ordersAdmin : ordersAdminSlice,
        reviews : shopReviewSlice,
        analytics : analyticsSlice
    },
});

export default store;



 