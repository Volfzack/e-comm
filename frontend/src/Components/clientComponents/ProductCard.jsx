import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  deleteCartItem
} from "../../state/shop/cartSlice";
import {addToFavourites,deleteFavouriteItem, fetchFavouriteItems} from '../../state/shop/favouritesSlice';
import { toast } from "react-toastify";
const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {cartItems } = useSelector((state) => state.shopCart);
  const {favouriteItems} = useSelector((state) => state.favourites);



  const handleAddToCart = () => {
    if(!isAuthenticated, !user) {
      toast.error("Please login to add to cart");
      return
    }
    let maxQuantity = 0;
    cartItems?.items?.forEach((item) => {
      if (item.productId.toString() === product._id.toString()) {
        maxQuantity = item.quantity;
      }
    });
    if(maxQuantity >= product.quantity) {
      toast.error('You added the maximum quantity of this product in your cart');
      return
    } else {
    dispatch(
      addToCart({ userId: user?.id, productId: product._id, quantity: 1 })
    );
  }
  };

  

  const handleFavorites = () => {
    if(!isAuthenticated, !user) {
      toast.error("Please login to add to wishlist");
      return
    }
    if (favouriteItems?.items?.find(item => item.productId._id === product._id)) {
      dispatch(deleteFavouriteItem({userId: user.id, productId: product._id})).then((res) => { if (res.payload.success) dispatch(fetchFavouriteItems(user.id)) });
    } else {
      dispatch(addToFavourites({userId: user.id, productId: product._id})).then((res) => { if (res.payload.success) dispatch(fetchFavouriteItems(user.id)) });
    }

  }


  const handleUpdateCartQuantity = () => {
    const productQuantity =
      cartItems?.items?.find((item) => item.productId.toString() === product._id.toString())
        .quantity - 1;
        if (productQuantity === 0) {
          dispatch(deleteCartItem({userId: user.id, productId: product._id}));
        } else {
    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: product._id,
        quantity: productQuantity,
      })
    )
  }
  };

  return (
    <div className="flex flex-col relative cursor-pointer w-full lg:w-[300px] md:w-[250px] sm:w-[200px] text-black rounded-2xl">
      <Link
        to={`/product/${product._id}`}
        className="flex flex-col w-full h-[250px]"
      >
        <img
          className="w-full h-full object-contain bg-white rounded-t-2xl"
          src={product.images[0]}
          alt=""
        />
      </Link>
      <div
        className="absolute top-2 right-2 text-xl text-red-500 cursor-pointer"
        onClick={() => {
          handleFavorites();
        }}
      >
        {favouriteItems?.items?.find(item => item.productId._id === product._id) ? <FaHeart /> : <FaRegHeart />}
      </div>
      {product.quantity <= 5  && product.quantity >= 1 ? (
        <div className="absolute top-0 left-0 text-xl text-white bg-yellow-600 p-2 rounded-lg rounded-bl-none font-bold">
          Only {product.quantity} left
        </div>
      ) : product.quantity === 0 ? (
        <div className="absolute top-0 left-0 text-xl text-white bg-red-600 p-2 rounded-lg rounded-bl-none font-bold">
          Out of stock
        </div>
      ) : null}
      <div className="flex flex-col justify-end rounded-b-2xl items-center p-2 text-white bg-black">
        <h1 className="text-lg font-bold line-clamp-1">{product.title}</h1>
        <p className="text-md font-bold">{product.category}</p>
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-lime-600">
            {product?.salePrice}$
          </p>
          {product?.price > 0 && (
            <p className="text-md font-bold text-red-600 line-through">
              {product?.price}$
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 w-full justify-center mb-1">
          <Rating
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
            size={20}
            initialValue={product.rating}
            readonly={true}
          />
          <p className="text-md mt-1.5 font-bold">{product?.rating?.toFixed(1)}</p>
        </div>
        {cartItems?.items?.find((item) => item.productId.toString() === product._id)
          ?.quantity > 0 && user ? (
          <div style={{display: product.quantity > 0 ? 'flex' : 'none'}} className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateCartQuantity()}
              className="p-2 text-fuchsia-500 rounded-2xl font-bold cursor-pointer"
            >
              -
            </button>
            <p className="text-lg font-bold">
              {
                cartItems?.items?.find((item) => item.productId.toString() === product._id)
                  ?.quantity
              }
            </p>
            <button
              onClick={() => handleAddToCart()}
              className="p-2 text-fuchsia-500 rounded-2xl font-bold cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            disabled={product.quantity === 0}
            onClick={() => handleAddToCart()}
            className="p-2 bg-fuchsia-600 rounded-2xl font-bold cursor-pointer"
          >
           {product.quantity > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
