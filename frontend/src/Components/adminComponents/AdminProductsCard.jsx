import React from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";


const AdminProductsCard = ({product, formData, setFormData, setCreateProductWindow, setCurrentProduct, handleDelete, setProductImages}) => {
  return (
    <div className='flex flex-col lg:w-[300px] md:w-[250px] sm:w-[200px] min-h-[400px] text-black rounded-2xl'>
                <img className='w-full h-full object-contain bg-white rounded-t-2xl' src={product?.images[0]} alt="" />
                <div className='flex flex-col rounded-b-2xl items-center p-2 text-white bg-black'>
                    <h1 className='text-lg font-bold line-clamp-2'>{product?.title}</h1>
                    <p className='text-md font-bold'>{product?.category}</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-md font-bold text-lime-600'>{product?.salePrice}$</p>
                        {product?.price > 0 ? <p className='text-md font-bold text-red-600 line-through'>{product?.price}$</p> : null}
                    </div>
                    <div className='flex justify-between w-full'>
                        <FaPenToSquare onClick={() => {setCreateProductWindow(true); setProductImages(product?.images);  setFormData({
                            title: product?.title,
                            description: product?.description,
                            price: product?.price,
                            salePrice: product?.salePrice,
                            category: product?.category,
                            quantity: product?.quantity,
                            characteristics: product?.characteristics,
                            image1: null,
                            image2: null,
                            image3: null,
                            image4: null,
                        }); setCurrentProduct(product._id)}} className='text-2xl cursor-pointer text-fuchsia-600'/>
                        <RiDeleteBin5Fill onClick={() => handleDelete(product._id)} className='text-2xl cursor-pointer text-red-500'/>
                    </div>
                </div>
            </div>
  )
}

export default AdminProductsCard