import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/client/Home';
import LoginSignup from './Pages/client/LoginSignup';
import AdminLayout from './Components/adminComponents/AdminLayout';
import AdminDashboard from './Pages/admin/Dashboard';
import AdminProducts from './Pages/admin/Products';
import AdminOrders from './Pages/admin/Orders';
import Product from './Pages/client/Product';
import GuestLayout from './Components/clientComponents/GuestLayout';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './state/authSlice';
import CheckAuth from './Components/CheckAuth';
import Category from './Pages/client/Category';
import Cart from './Pages/client/Cart';
import Favourites from './Pages/client/Favourites';
import Orders from './Pages/client/Orders';
import Checkout from './Pages/client/Checkout';
import OrderDetails from './Pages/client/OrderDetails';
import PurchaseSuccessPage from './Pages/client/PurchaseSuccessPage';
import PurchaseCancelPage from './Pages/client/PurchaseCancelPage';


const App = () => {

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={ isAuthenticated } user={user}>
            <LoginSignup />
          </CheckAuth>
          } />
        <Route path='/' element={
          <CheckAuth isAuthenticated={ isAuthenticated } user={user}>
           <GuestLayout />
          </CheckAuth>
           }>
          <Route path='home' element={<Home />} />
          <Route path='product/:productId' element={<Product />} />
          <Route path='categories' element={<Category />} />
          <Route path='cart' element={<Cart/>} />
          <Route path='favourites' element={<Favourites />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order/:orderId' element={<OrderDetails />} />
          <Route path='purchase-success' element={<PurchaseSuccessPage />} />
          <Route path='purchase-cancel' element={<PurchaseCancelPage />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={ isAuthenticated } user={user}>
            <AdminLayout />
          </CheckAuth>
          }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
      </Routes>  
      
    </>
  )
}

export default App