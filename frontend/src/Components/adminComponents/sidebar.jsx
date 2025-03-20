import React from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { FaClipboardList, FaShoppingCart  } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Adminsidebar = () => {

  const navigate = useNavigate();


  return (
    <div className='bg-black sticky top-0 flex flex-col gap-10 sm:p-3 text-white'>
      <div onClick={() => navigate('/admin/dashboard')} className='flex items-center cursor-pointer gap-1 sm:gap-2 '> 
        <MdSpaceDashboard className='text-2xl' />
        <h1 className='text-lg font-bold'>Dashboard</h1>
      </div>
      <div onClick={() => navigate('/admin/products')} className='flex items-center cursor-pointer gap-1 sm:gap-2'> 
        <FaBasketShopping className='text-2xl' />
        <h1 className='text-lg font-bold'>Products</h1>
      </div>
      <div onClick={() => navigate('/admin/orders')} className='flex items-center cursor-pointer gap-1  sm:gap-2'> 
        <FaClipboardList className='text-2xl' />
        <h1 className='text-lg font-bold'>Orders</h1>
      </div>
      <div onClick={() => navigate('/home')} className='flex items-center cursor-pointer pr-1 sm:pr-0 gap-1 sm:gap-2'> 
        <FaShoppingCart className='text-2xl'/>
        <h1 className='text-lg font-bold'>Shopping side</h1>
      </div>
    </div>
  )
}

export default Adminsidebar