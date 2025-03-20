import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  deleteCartItem,
} from "../../state/shop/cartSlice";
import {createOrderCod, createWithStripe} from '../../state/shop/ordersSlice';
import { toast } from "react-toastify";
import { IoCashOutline } from "react-icons/io5";
import { FaCcStripe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js'



const Checkout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(fetchCartItems(user?.id)).then((res) => {
        if (res.payload.success) {
          setLoading(false);
        }
      });
    }
  }, [dispatch, user, isAuthenticated]);


  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");

  const data = {
    userId: user.id,
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    userPhone: phone,
    itemsQuantity: cartItems?.reduce((total, item) => total + item.quantity, 0),
    items: cartItems?.map((item) => ({
      productId: item.productId,
      name: item.title,
      price: item.salePrice,
      image: item.images[0],
      quantity: item.quantity,
    })),
    shippingAddress: {
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    },
    paymentMethod: paymentMethod,
    total: cartItems?.reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    ),
  };

  
  const handleCartRemove = (id) => {
    dispatch(deleteCartItem({ userId: user.id, productId: id })).then((res) => {
      if (res.payload.success) dispatch(fetchCartItems(user.id));
    });
  };
  
  
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(stripeKey)
const handleCheckout = (e) => {
    e.preventDefault();
    if(paymentMethod === 'Cash on delivery'){
      dispatch(createOrderCod(data)).then(res => {
        if (res.payload.data.success) {
          toast.success(res.payload.data.message);
          dispatch(fetchCartItems(user.id));
          navigate('/orders')
        }
      })
    } else {
      dispatch(createWithStripe(data, {headers: {'Authorization': `Bearer ${user?.token}`}})).then( async res => {
        if(res.payload.data.success) {
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({
            sessionId: res.payload.data.sessionId
          })
        }
      })
    }

};

  if (loading) {
    return <div className="h-screen text-white flex items-center justify-center px-4 text-4xl" >Processing...</div>;
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={handleCheckout}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="bg-neutral-600 text-white shadow-md rounded-lg p-6"
          >
            <h2 id="summary-heading" className="text-lg font-medium ">
              Order summary
            </h2>
            <ul className="mt-6 divide-y divide-gray-200 border-b border-gray-200">
              {cartItems.length > 0 && cartItems?.map((item) => (
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
                        <div className="flex flex-col items-center">
                          {item.price > 0 ? (
                            <p className="ml-4 text-red-500 line-through">{`$${item.price.toFixed(
                              2
                            )}`}</p>
                          ) : null}
                          <p className="ml-4">{`$${item.salePrice.toFixed(
                            2
                          )}`}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 pt-2 flex items-end justify-between">
                      <p className="flex items-center text-sm text-white space-x-2">
                        <svg
                          className="h-5 w-5 text-fuchsia-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>In stock</span>
                      </p>

                      <div className="ml-4">
                        <button
                          onClick={() => handleCartRemove(item.productId)}
                          type="button"
                          className="font-medium cursor-pointer text-fuchsia-500 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center w-full">
                <p className="font-bold">
                  Goods: (
                  {cartItems?.map((item) => item.quantity)
                    .reduce((a, b) => a + b, 0)}
                  )
                </p>
                <p className="text-green-500 font-bold">
                  {cartItems?.map((item) => item.salePrice * item.quantity)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                  $
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Discount:</p>
                <p className="text-red-500 line-through font-bold">
                  {cartItems?.map((item) => item.price * item.quantity)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                  $
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <h2 className="font-bold">Shipping:</h2>
                <p className="bg-black bg-clip-text text-lime-500 font-bold">
                  FREE
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <h2 className="font-bold">Total:</h2>
                <p className="bg-black bg-clip-text text-fuchsia-500 font-bold">
                  {cartItems?.map((item) => item.salePrice * item.quantity)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                  $
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-5">
              <button
                disabled={!cartItems?.length}
                type="submit"
                className="w-full bg-fuchsia-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium cursor-pointer text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Place order
              </button>
            </div>
          </section>

          {/* Shipping information */}
          <section
            aria-labelledby="shipping-heading"
            className="mt-10 bg-neutral-600 h-fit text-white shadow-md rounded-lg p-6"
          >
            <h2 id="shipping-heading" className="text-lg font-medium">
              Shipping information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
                >
                  First name
                </label>
                <div className="mt-1">
                  <div className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  >{user?.name}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <div className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  >{user?.lastName}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="mt-1">
                  <div className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  >{user?.email}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone number (optional)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-5 border-transparent bg-neutral-200 text-black sm:text-sm rounded-md"
                    >
                      <option>US</option>
                      <option>UK</option>
                      <option>RU</option>
                    </select>
                  </div>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    id="phone"
                    name="phone"
                    className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md pl-20"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    type="text"
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium">
                  City
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium">
                  Country
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                    type="text"
                    id="region"
                    name="region"
                    autoComplete="address-level1"
                    className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium"
                >
                  Postal code
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    autoComplete="postal-code"
                    className="shadow-sm outline-none p-1 bg-neutral-200 text-black block w-full sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment information */}
          <section
            aria-labelledby="payment-heading"
            className="mt-10 bg-neutral-600 h-fit text-white shadow-md rounded-lg p-6"
          >
            <h2 id="payment-heading" className="text-lg font-medium">
              Payment Methods
            </h2>
            <div className="w-full h-full flex items-center justify-between rounded-2xl">
              <div
                onClick={() => setPaymentMethod("Cash on delivery")}
                className="outline-1 cursor-pointer p-5 gap-1 outline-black rounded-2xl flex items-center w-[200px] h-[100px] bg-neutral-400"
                style={{
                  background:
                    paymentMethod === "Cash on delivery" ? "#b91cbb" : "",
                }}
              >
                <IoCashOutline
                  className="text-2xl self-center text-fuchsia-500"
                  style={{
                    color: paymentMethod === "Cash on delivery" ? "white" : "",
                  }}
                />
                <p className="text-white font-bold">Cash on delivery</p>
              </div>
              <div
                onClick={() => setPaymentMethod("Stripe")}
                className="outline-1 cursor-pointer outline-black rounded-2xl flex w-[200px] h-[100px] bg-neutral-400"
                style={{
                  background: paymentMethod === "Stripe" ? "#b91cbb" : "",
                }}
              >
                <FaCcStripe
                  className="text-2xl w-full h-full self-center text-fuchsia-500"
                  style={{ color: paymentMethod === "Stripe" ? "white" : "" }}
                />
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
