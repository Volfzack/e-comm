import React, { useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaHeart, FaTrashAlt  } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import logo from "../../../src/assets/pc-logo-monogram-modern-design-template-free-vector.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProductShop} from '../../state/shop/productsShopSlice';
import {
  addToCart,
  updateCartQuantity,
  deleteCartItem
} from "../../state/shop/cartSlice";
import {addReview, getReviews, deleteReview} from '../../state/shop/reviewSlice';
import {addToFavourites,deleteFavouriteItem, fetchFavouriteItems} from '../../state/shop/favouritesSlice';
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

const Product = () => {
  
  const {cartItems } = useSelector((state) => state.shopCart);
  const {favouriteItems} = useSelector((state) => state.favourites);
  const {user, isAuthenticated} = useSelector((state) => state.auth);
  const {reviewItems} = useSelector((state) => state.reviews);

  const { productId } = useParams();
  const slide = useRef();
  const dispatch = useDispatch();

  const [activeImage, setActiveImage] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [characteristics, setCharacteristics] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const [product, setProduct] = useState({});
  const [showAddRating, setShowAddRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(1);
  const [comment, setComment] = useState("");

  
  
  useEffect(() => {
    dispatch(getSingleProductShop(productId)).then((res) => {
      setProduct(res.payload);
      setCharacteristics(res.payload.characteristics);
      setProductImages(res.payload.images);
      setIsFavourite(favouriteItems?.items?.find(item => item.productId._id === res.payload._id) ? true : false);
    })
    window.scrollTo(0, 0);
    
  }, [productId,dispatch]);  
  
  useEffect(() => {
    dispatch(getReviews(productId))
}, [productId]);

let total_rating = 0;
reviewItems?.forEach((item) => {
  total_rating += item.rating
})

  const handleAddToCart = () => {
     if(!isAuthenticated, !user) {
       toast.error("Please login to add to cart");
       return
     }
     let maxQuantity = 0;
         cartItems?.items?.forEach((item) => {
           if (item.productId.toString() === product?._id.toString()) {
             maxQuantity = item.quantity;
           }
         });
         if(maxQuantity >= product?.quantity) {
           toast.error('You added the maximum quantity of this product in your cart');
           return
         } else {
          dispatch(
            addToCart({ userId: user?.id, productId: product?._id, quantity: 1 })
          );
     }
   };
 
   const handleFavorites = () => {
     if(!isAuthenticated, !user) {
       toast.error("Please login to add to wishlist");
       return
     }
     if (favouriteItems?.items?.find(item => item.productId._id === product?._id)) {
       dispatch(deleteFavouriteItem({userId: user?.id, productId: product?._id})).then((res) => { if (res.payload.success) dispatch(fetchFavouriteItems(user?.id)) });
       setIsFavourite(false);
     } else {
       dispatch(addToFavourites({userId: user?.id, productId: product?._id})).then((res) => { if (res.payload.success) dispatch(fetchFavouriteItems(user?.id)) });
       setIsFavourite(true);
     }
 
   }

    const handleDeleteReview = (review) => {
      if(review.userId === user.id) {
        dispatch(deleteReview(review._id)).then((res) => { if (res.payload.success) dispatch(getReviews(productId)) });
      } else {
        toast.error("You can only delete your own review");
        return
      }
    }
 
 
   const handleUpdateCartQuantity = () => {
     const productQuantity =
       cartItems?.items?.find((item) => item.productId.toString() === product?._id.toString())
         .quantity - 1;
         if (productQuantity === 0) {
           dispatch(deleteCartItem({userId: user?.id, productId: product?._id}));
         } else {
     dispatch(
       updateCartQuantity({
         userId: user?.id,
         productId: product?._id,
         quantity: productQuantity,
       })
     )
   }
   };

   const handleShowAddRating = () => {
     if(reviewItems?.find(review => review.userId === user?.id) && reviewItems?.find(review => review.productId === product?._id)) {
       toast.error("You can only add a review once");
       return
     }
     setShowAddRating(true);
   }

   const handleAddReview = (e) => {
     e.preventDefault();
     if(!isAuthenticated, !user) {
       toast.error("Please login to add a review");
       return
     }
     dispatch(addReview({userId: user?.id, productId: product?._id, rating: selectedRating, comment: comment, userName: user.name})).then((res) => {console.log(res); if (res.payload.success) {dispatch(getReviews(product._id)); toast.success(res.payload.message); setShowAddRating(false); setSelectedRating(1); setComment("")} else {toast.error(res.message)}});
     
   }


  const scrollToReviews = () => {
    slide.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (
    <div className='flex flex-col p-5 md:px-20 gap-3'>
      <div className='block sm:flex  w-full gap-5'>
        <div className='flex w-full h-[700px] gap-2'>
          <div className='flex flex-col items-start justify-start h-[600px] overflow-y-scroll w-1/4 gap-3'>
            {productImages.map((image) => (<img key={image} onClick={() => setActiveImage(productImages.indexOf(image))} className='w-full h-1/5 object-contain bg-white cursor-pointer border-1 border-neutral-600 rounded-2xl p-1' src={image} alt="" />))}
          </div>
          <div className='w-full h-full rounded-2xl'>
            <img className='w-full rounded-2xl h-full bg-white object-contain' src={productImages[activeImage]} alt="" />
          </div>
        </div>
        <div className='flex flex-col gap-5 w-full h-full items-start text-white'>
          <h1 className='text-2xl font-bold'>{product.title}</h1>
            <div className='flex items-center'>
              <MdOutlineStarPurple500 className='text-amber-400 text-lg' />
              <p className='text-lg font-bold'>{product?.rating?.toFixed(1)}</p>
          </div>
          <div className='flex items-center w-full gap-2 lg:gap-10'>
            <div className='flex flex-col bg-neutral-600 rounded-2xl items-start p-3 w-1/2'>
              <h2 className='text-2xl font-bold'>{product.salePrice}$</h2>
              { product.price > 0 && <h2 className='text-lg font-bold text-red-500 line-through '>{product.price}$</h2>}
            </div>
            <div onClick={() => handleFavorites()} className='bg-neutral-600 p-5 rounded-2xl'>
              {isFavourite ? <FaHeart className='text-2xl cursor-pointer text-red-500'/> : <FaRegHeart className='text-2xl cursor-pointer text-red-500'/>}
            </div>
            {cartItems?.items?.find((item) => item.productId.toString() === product._id)
          ?.quantity > 0 && user ? (
          <div style={{display: product.quantity > 0 ? 'flex' : 'none'}} className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateCartQuantity()}
              className="p-2 text-fuchsia-500 text-2xl font-bold cursor-pointer"
            >
              -
            </button>
            <p className="text-2xl font-bold">
              {
                cartItems?.items?.find((item) => item.productId.toString() === product._id)
                  ?.quantity
              }
            </p>
            <button
              onClick={() => handleAddToCart()}
              className="p-2 text-fuchsia-500 text-2xl font-bold cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            disabled={product.quantity === 0}
            onClick={() => handleAddToCart()}
            className="bg-fuchsia-600 rounded-2xl text-lg font-bold p-3 lg:p-5 cursor-pointerr"
          >
           {product.quantity > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
        )}
          </div>
          <div className='flex items-center justify-between border-t-1 pt-5 border-t-neutral-500 pr-8 sm:pr-0 lg:justify-normal lg:gap-20 w-full'>
            <h2 className='text-lg font-bold'>About this product</h2>
            <button onClick={scrollToReviews} className='bg-neutral-600 text-white text-md font-bold rounded-4xl p-2 cursor-pointer hover:bg-fuchsia-700'>To reviews {">"} </button>
          </div>
          <div className='list-none flex flex-col overflow-y-scroll text-lg'>
            {Object.entries(characteristics).map(([key,value]) =>(
              <li className='border-b-1 border-b-neutral-500' key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div ref={slide} className='flex flex-col items-start h-full w-full border-t-1 text-white border-t-neutral-500 gap-5'>
        <h1 className='text-2xl font-bold'>Product information</h1>
        <p className='m-5 mt-0'>{product.description}</p>
      </div>
      {/* reviews */}
      <div className='flex gap-10 items-start border-t-1 w-full text-white border-t-neutral-500'>
        <div className='flex flex-col sticky top-0 mt-5 w-1/4 gap-5'>
            <h1 className='text-2xl font-bold'>Customer reviews</h1>
            <div className={`${reviewItems?.length > 0 ? 'flex' : 'hidden'} flex items-center gap-3`}>
            <span className='text-amber-400 text-md'>&#9733;</span>
              <p>{product?.rating?.toFixed(1)} out of 5</p>
            </div>
            <div className={`${reviewItems?.length > 0 ? 'flex' : 'hidden'} flex flex-col w-full items-start gap-5`}>
              <div className='flex items-center w-full gap-3'>
                <p className='text-md font-bold'>5<span className='text-amber-400 text-md'>&#9733;</span></p>
                <div className='w-full h-2 bg-gray-500 rounded-2xl'>
                  <div style={{width: `${reviewItems.filter(item => item.rating === 5).length / reviewItems.map(item => item.rating).length * 100}%`}} className='h-full bg-amber-300 rounded-2xl'></div>
                </div>
              </div>
              <div className='flex items-center w-full gap-3'>
                <p className='text-md font-bold'>4<span className='text-amber-400 text-md'>&#9733;</span></p>
                <div className='w-full h-2 bg-gray-500 rounded-2xl'>
                  <div style={{width: `${reviewItems.filter(item => item.rating === 4).length / reviewItems.map(item => item.rating).length * 100}%`}} className='h-full bg-amber-300 rounded-2xl'></div>
                </div>
              </div>
              <div className='flex items-center w-full gap-3'>
                <p className='text-md font-bold'>3<span className='text-amber-400 text-md'>&#9733;</span></p>
                <div className='w-full h-2 bg-gray-500 rounded-2xl'>
                  <div style={{width: `${reviewItems.filter(item => item.rating === 3).length / reviewItems.map(item => item.rating).length * 100}%`}} className='h-full bg-amber-300 rounded-2xl'></div>
                </div>
              </div>
              <div className='flex items-center w-full gap-3'>
                <p className='text-md font-bold'>2<span className='text-amber-400 text-md'>&#9733;</span></p>
                <div className='w-full h-2 bg-gray-500 rounded-2xl'>
                  <div style={{width: `${reviewItems.filter(item => item.rating === 2).length / reviewItems.map(item => item.rating).length * 100}%`}} className='h-full bg-amber-300 rounded-2xl'></div>
                </div>
              </div>
              <div className='flex items-center w-full gap-3'>
                <p className='text-md font-bold'>1<span className='text-amber-400 text-md'>&#9733;</span></p>
                <div className='w-full h-2 bg-gray-500 rounded-2xl'>
                  <div style={{width: `${reviewItems.filter(item => item.rating === 1).length / reviewItems.map(item => item.rating).length * 100}%`}} className='h-full bg-amber-300 rounded-2xl'></div>
                </div>
              </div>

           </div> 
        </div>
        <div className='flex flex-col mt-5 gap-10 w-1/2 items-center'>
        <div className={`${reviewItems?.length > 0 ? 'flex' : 'flex-col'} w-full justify-between items-center`}>
          <h1 className='text-2xl font-bold'>{reviewItems?.length > 0 ? 'Customer reviews' : 'No reviews yet'}</h1>
          <span onClick={() => handleShowAddRating()} className='text-amber-400 text-lg text-md cursor-pointer hover:text-fuchsia-700'>Add a review</span>
        </div>
          {showAddRating ?
           <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
              <div onClick={() => setShowAddRating(false)} className='absolute inset-0 bg-black opacity-50'></div>
              <div className='bg-zinc-500 z-50 w-[300px] md:w-[400px] p-4 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Add a review</h2>
                <form onSubmit={handleAddReview} className='flex flex-col gap-3'>
                  <div className='flex flex-col'>
                    <label className='font-bold'>Rating</label>
                    <div className='flex gap-1 items-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setSelectedRating(star)}
                          className={`text-2xl cursor-pointer  ${star <= selectedRating ? 'text-amber-400' : 'text-black'}`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-bold'>Review</label>
                    <textarea
                      className='p-2 rounded-2xl bg-neutral-300 text-black placeholder:text-black w-full focus:outline-0'
                      name="review"
                      rows="6"
                      placeholder='Enter your review'
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='flex justify-end'>
                    <button className='p-2 bg-fuchsia-500 sm:w-2/4 rounded-2xl self-center  text-white font-bold cursor-pointer' type='submit'>Submit</button>
                  </div>
                </form>
              </div>
           </div>
           
           : null}
          {reviewItems?.length > 0 ? reviewItems?.map((item) => (  
          <div key={item._id} className='flex bg-zinc-700 rounded-2xl p-5 self-start flex-col gap-3 items-start'>
            <div className='flex gap-5 items-center'>
              <img className='w-10 h-10 rounded-[50%] border-2 border-white' src={logo} alt="" />
              <p className='font-bold'>{item.userName}</p>
              <p>{item.createdAt.split("T")[0]}</p>
            </div>
            <div className='flex items-center gap-5'>
              <Rating SVGstyle={{ display: "inline" }} allowFraction={true} size={20} initialValue={item.rating} readonly={true} />
            </div>
            <p>{item.comment}</p>
            <FaTrashAlt onClick={() => handleDeleteReview(item)} className={`${item.userId === user?.id && item.productId === product?._id ? '' : 'hidden'} text-red-500 text-lg text-md cursor-pointer hover:text-fuchsia-700`} /> 
          </div>  
          )) : null}
        </div>
      </div>
    </div>
  )
  }

export default Product