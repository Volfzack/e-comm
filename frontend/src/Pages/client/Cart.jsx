import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TbGardenCartOff } from "react-icons/tb";
import {fetchCartItems, deleteCartItem, clearCart, updateCartQuantity, addToCart} from '../../state/shop/cartSlice';
import {getSingleProductShop} from '../../state/shop/productsShopSlice';
import {toast} from 'react-toastify';

const Cart = () => {
    const {user, isAuthenticated} = useSelector(state => state.auth);
    const [userCartItems, setUserCartItems] = useState([]);
    const dispatch = useDispatch();
    const [selectedAll, setSelectedAll] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
      if( user && isAuthenticated) {
        dispatch(fetchCartItems(user?.id)).then((res) => {
          console.log(res);
           if (res.payload.success) {
            setUserCartItems(res.payload.data.items);
          } else {
            return
          }
        });
      }
    },[dispatch, user, isAuthenticated]);
    

    const handleCartRemove = (id) => {
      dispatch(deleteCartItem({userId: user?.id, productId: id})).then((res) => { if (res.payload.success) setUserCartItems(res.payload.data.items) });
    }

    const handleSelectAllAndClear = () => {
      if (selectedAll) {
        setSelectedAll(false);
        dispatch(clearCart(user?.id)).then((res) => { if (res.payload.success) setUserCartItems(res.payload.data.items) });
      } else {
        toast.info("Select all items to clear the cart");
      }
    };


      const handleAddToCart = (prodId) => {
        dispatch(getSingleProductShop(prodId)).then((res) => {
          let maxQuantity = 0;
         userCartItems?.forEach((item) => {
              if (item.productId.toString() === res.payload?._id.toString()) {
                maxQuantity = item.quantity;
              }
            });
            if(maxQuantity >= res.payload?.quantity) {
              toast.error('You added the maximum quantity of this product in your cart');
              return
            } else {
        dispatch(
          addToCart({ userId: user?.id, productId: prodId, quantity: 1 })
        ).then((res) => {
          if (res.payload.success) {
            dispatch(fetchCartItems(user.id)).then((res) => {
              setUserCartItems(res.payload.data.items);
            });
          }
        });
      }
        });
        
      };
    
      const handleUpdateCartQuantity = (prodId) => {
        const productQuantity =
          userCartItems?.find((item) => item.productId.toString() === prodId.toString())
            .quantity - 1;
            if (productQuantity === 0) {
              toast.error('Quantity cannot be lesser than 1, please remove the item if you want to clear the cart');
              return
            } else {
              dispatch(
                updateCartQuantity({
                  userId: user?.id,
                  productId: prodId,
                  quantity: productQuantity,
                })
              ).then((res) => {
                if (res.payload.success) {
                  dispatch(fetchCartItems(user?.id)).then((res) => {
                    setUserCartItems(res.payload.data.items);
                  });
                }
              });
            }
      };
              
       
  return (
    <>
    <div style={{display: isAuthenticated && user && userCartItems.length !== 0 ? 'flex' : 'none'}} className='flex flex-col items-center gap-5 sm:p-5 lg:p-20 min-h-screen'>
    <h1 className='text-3xl font-bold text-white'>Your cart</h1>
    <form className="flex w-full xl:w-1/2 flex-col">
            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="bg-neutral-600 text-white shadow-md rounded-lg p-6">
              <h2 id="summary-heading" className="text-lg font-medium ">
                Order summary
              </h2>

              <div className='bg-neutral-300 p-5 flex items-center justify-between rounded-2xl text-black'>
                <div className='flex items-center gap-2'>
                  <input onChange={() => setSelectedAll(!selectedAll)} type="checkbox" name="choose-all"/>
                  <p className='font-bold'>Choose all</p>
                </div>
                <p onClick={handleSelectAllAndClear} className='text-red-500 font-bold cursor-pointer'>Clear the cart</p>
             </div>
  
              <ul className="mt-6 divide-y divide-gray-200 border-b border-gray-200">
                {userCartItems.map((item) => (
                  <li key={item.productId} className="flex py-6 sm:py-5">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden sm:w-20 sm:h-20">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
  
                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between text-base font-medium sm:justify-between">
                          <h3>
                            <p>{item.title}</p>
                            <p>{`(${item.quantity})`}</p>
                          </h3>
                          <div className='flex flex-col items-center'>
                            { item.price > 0 ? <p className="ml-4 text-red-500 line-through">{`$${item.price.toFixed(2)}`}</p> : null}
                            <p className="ml-4">{`$${item.salePrice.toFixed(2)}`}</p>
                          </div>
                        </div>
                      </div>
  


                      <div className="ml-4 flex flex-col ">
                        <span className='flex self-end items-center gap-1 font-bold'>
                          <p onClick={() => handleUpdateCartQuantity(item.productId)} className='cursor-pointer'>-</p>
                          <p>{item.quantity}</p>
                          <p onClick={() => handleAddToCart(item.productId)} className='cursor-pointer'>+</p>
                        </span>
                        <button onClick={() => handleCartRemove(item.productId)} type="button" className="font-medium self-end text-fuchsia-500 cursor-pointer hover:text-red-500">
                          Remove
                        </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              <div className='flex justify-between items-center w-full'>
              <p className='font-bold'>Goods: ({userCartItems.map(item => item.quantity).reduce((a, b) => a + b, 0)})</p>
              <p className='text-green-500 font-bold'>{userCartItems.map(item => item.salePrice * item.quantity).reduce((a, b) => a + b, 0).toFixed(2)}$</p>
            </div>
              <div className="flex items-center justify-between">
                <p className='font-bold'>Discount:</p>
                <p className='text-red-500 line-through font-bold'>{userCartItems.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0).toFixed(2)}$</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <h2 className='font-bold'>Shipping:</h2>
              <p className='bg-black bg-clip-text text-lime-500 font-bold'>FREE</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <h2 className='font-bold'>Total:</h2>
              <p className='bg-black bg-clip-text text-fuchsia-500 font-bold'>{userCartItems.map(item => item.salePrice * item.quantity).reduce((a, b) => a + b, 0).toFixed(2)}$</p>
              </div>
            </div>
            <div className="mt-10 lg:mt-5">
            <button
              onClick={() => navigate('/checkout')}
              type="submit"
              className="w-full bg-fuchsia-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium cursor-pointer text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Checkout
            </button>
          </div>
          </section>
        </form>
      </div>
  <div style={{ display: !isAuthenticated && user === null || userCartItems.length === 0 ? 'flex' : 'none'}} className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <h1 className='text-2xl font-bold text-white'>Your cart is empty</h1>
      <TbGardenCartOff className='text-[300px] md:text-[500px] animate-pulse text-red-500' />
      <Link to={'/categories'} className='text-fuchsia-500 text-2xl font-bold'>Go to Shop</Link>
    </div>
  </>
  )
}

export default Cart