import React, { useEffect } from "react";
import ClientHeader from "./header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../state/shop/cartSlice";
import { fetchFavouriteItems } from "../../state/shop/favouritesSlice";
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/bg-photo.jpg'

const GuestLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  




  useEffect(() => {
    if (user && isAuthenticated ) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user]);


  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(fetchFavouriteItems(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col w-full bg-neutral-800">
      <ClientHeader className="w-full" />
      <div className="w-full">
      <div className={`min-h-screen ${location.pathname !== '/' ? 'hidden' : ''} bg-gray-900`}>
      {/* Welcome Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="Welcome Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl text-white font-bold mb-6">Welcome to Electronic shop</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Discover the latest products in technology and innovative solutions for your digital lifestyle
          </p>
          <div className="space-x-4">
            <button onClick={() => navigate("/home")} className="bg-blue-600 text-white px-8 py-3 rounded-lg cursor-pointer text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-blue-600">🛍️</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Wide Selection</h3>
              <p className="text-gray-600 dark:text-gray-300">Browse through thousands of latest tech products</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-blue-600">🚚</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your orders delivered quickly and securely</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-blue-600">💫</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Best Deals</h3>
              <p className="text-gray-600 dark:text-gray-300">Enjoy exclusive discounts and special offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 - 2025 Electronic Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
        <Outlet />
      </div>
      <Footer className="w-full min-h-screen" />
    </div>
  );
};

export default GuestLayout;
