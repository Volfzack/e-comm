import React, { useEffect } from 'react';
import Carousel from '../../Components/clientComponents/Carousel';
import { GiDeliveryDrone } from "react-icons/gi";
import { TbCreditCardRefund } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { VscCallIncoming } from "react-icons/vsc";
import ProductCard from '../../Components/clientComponents/ProductCard';
import nvidiaCard from '../../assets/4090.png';
import amdCard from '../../assets/asus_radeon_rx_7900_xtx_tuf_gaming_oc_24g_2553866_1-Photoroom.png';
import Pc from '../../assets/Hyte-Y70-Build-PC.png';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight  } from "react-icons/fa";
import { categories } from '../../../config/categoriesList';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsShop } from '../../state/shop/productsShopSlice';
import finalFantasy from '../../assets/final-fantasy.jpg';
import rdr2 from '../../assets/Red_Dead_Redemption_2_coverart.jpg';
import daysGone from '../../assets/Days-Gone.jpg';
import eldenRing from '../../assets/Elden_Ring_-_cover.jpg';
import samsung from '../../assets/samsung24.jpg';

const Home = () => {

  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.productsShopList);
  
  useEffect(() => {
    dispatch(getProductsShop());
  }, [dispatch]);



  return (
    <div className='flex flex-col p-5 px-10 gap-3'>
      <Carousel/>
      <div className='grid grid-cols-2  sm:flex justify-center items-center gap-2 h-[150px] lg:h-[100px] w-full mb-15 sm:mb-0'>
        <div className='flex bg-fuchsia-700 gap-3 p-4 items-start h-full sm:w-full md:w-1/4 lg:w-1/5 text-white rounded-lg'>
          <GiDeliveryDrone className='text-2xl self-center' />
          <div className='flex flex-col'>
            <p className='font-bold text-md'>Free Delivery</p>
            <p>Orders from all item</p>
          </div>
        </div>
        <div className='flex bg-fuchsia-700 gap-2 p-4 items-start h-full sm:w-full md:w-1/4 lg:w-1/5 text-white rounded-lg'>
          <TbCreditCardRefund className='text-2xl self-center' />
          <div className='flex flex-col'>
            <p className='font-bold text-md'>Return & Refund</p>
            <p>Money back guarantee</p>
          </div>
        </div>
        <div className='flex bg-fuchsia-700 gap-3 p-4 items-start h-full sm:w-full md:w-1/4 lg:w-1/5 text-white rounded-lg'>
          <BiSolidDiscount className='text-2xl self-center' />
          <div className='flex flex-col'>
            <p className='font-bold text-md'>Discounts</p>
            <p>Up to 60%!</p>
          </div>
        </div>
        <div className='flex bg-fuchsia-700 gap-3 p-4 items-start h-full sm:w-full md:w-1/4 lg:w-1/5 text-white rounded-lg'>
          <VscCallIncoming className='text-2xl sm:text-md self-center' />
          <div className='flex flex-col'>
            <p className='font-bold text-md'>Support 24/7</p>
            <p>Contact us 24 hours a day</p>
          </div>
        </div>
      </div>
      <h1 className='text-3xl font-bold self-start mt-30 sm:mt-0 text-white'>Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:flex justify-center items-center lg:gap-10 gap-5 w-full'>
        {categories.map((category) => (
          <Link to={'/categories'} className='flex flex-col items-center w-full xl:w-1/8 h-[300px] bg-neutral-100 rounded-2xl cursor-pointer p-6' key={category.name}>
          <img className='w-full h-full object-contain rounded-2xl' src={category.img} alt="" />
          <p className='text-lg text-black font-bold'>{category.name}</p>
        </Link>))}
      </div>
      <h1 className='text-3xl font-bold self-start text-white'>We recommend</h1>
      <div className='flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-10 justify-items-center w-full'>
        {productsList?.slice(0, 6).map((product) => (<ProductCard key={product._id} product={product} />))}
      </div>
      <div className='relative w-full h-[600px] text-white lg:mt-10 '>
          <img className='w-full h-full object-cover rounded-2xl' src={samsung} alt="" />
          <div className='absolute top-10 left-40 lg:top-50 lg:left-100 flex flex-col items-center gap-3'>
            <p className='bg-black bg-clip-text sm:text-3xl font-bold text-yellow-500'>Sale 20% off</p>
            <p className='bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text sm:text-3xl font-bold text-transparent'>Galaxy S24</p>
            <Link to={"/product/67b4fb2ebd69e21b3cfd6fa7"} className='bg-black bg-clip-text sm:text-3xl font-bold text-neutral-500 cursor-pointer hover:text-fuchsia-500'>Buy now</Link>
          </div>
      </div>
      <h1 className='text-3xl font-bold self-start text-white'>New arrivals</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:flex gap-10 justify-center w-full'>
        {productsList?.slice(0, 4).map((product) => (<ProductCard key={product._id} product={product} />))}
      </div>
      <div className='flex flex-col items-center justify-evenly  w-full lg:mt-10 bg-neutral-900 rounded-2xl p-6'>
        <h1 className='text-3xl font-bold text-white'>Build your own PC beast</h1>
        <div className='flex justify-between w-full items-center mb-5'>
          <img className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[300px] lg:h-[300px] object-contain' src={nvidiaCard} alt="" />
          <div className='flex flex-col items-center'>
            <div className='flex items-center gap-2 sm:mr-20'>
              <FaRegArrowAltCircleLeft className='md:text-2xl text-lime-500' />
              <h1 className='text-sm md:text-2xl font-bold text-lime-500'>Team Green</h1>
            </div>
            <div className='flex items-center gap-2 sm:ml-20' >
              <h1 className='text-sm md:text-2xl font-bold text-red-500'>Team Red</h1>
              <FaRegArrowAltCircleRight className='md:text-2xl text-red-500' />
            </div>
          </div>
          <img className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[300px] lg:h-[300px] object-contain' src={amdCard} alt="" />
        </div>  
        <div className='flex justify-between w-full items-center'>
          <img className='w-1/3 h-full object-contain' src={Pc} alt="" />
          <h1 className='md:text-2xl font-bold text-white text-center'>Or buy an assembled PC <br />to play your favorite games</h1>
          <div className='grid grid-cols-2 w-1/3'>
            <img className='w-full h-full object-cover' src={rdr2} alt="" />
            <img className='w-full h-full object-cover' src={eldenRing} alt="" />
            <img className='w-full h-full object-cover' src={finalFantasy} alt="" />
            <img className='w-full h-full object-cover' src={daysGone} alt="" />
          </div>
        </div>  
      </div>  
    </div>
  )
}

export default Home
