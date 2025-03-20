import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { categories } from '../../../config/categoriesList';
import CharacteristicsInputs from '../../Components/adminComponents/CharacteristicsInputs';
import ImageUploader from '../../Components/adminComponents/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addNewProduct, updateProduct, deleteProduct } from '../../state/admin/productsSlice';
import { toast } from 'react-toastify';
import AdminProductsCard from '../../Components/adminComponents/AdminProductsCard';


const AdminProducts = () => {

  const [images, setImages] = useState([]);
  const initialData = {
    title: '',
    description: '',
    price: 0,
    salePrice: 0,
    category: 'Home appliance',
    quantity: 0,
    characteristics: {},
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  }

  const dispatch = useDispatch();
 
  const [createProductWindow, setCreateProductWindow] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const {products} = useSelector(state => state.productsList);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
 
  useEffect(() => {
   dispatch(getProducts()).then((res) => {
    setFilteredProducts(res.payload);
   });
  }, [dispatch]);



 const handleSubmit = async (e) => {
  e.preventDefault();
  currentProduct !== null ? dispatch(updateProduct({id: currentProduct, formData:formData})).then((res) => {
    if (res.payload.success) {
      dispatch(getProducts()).then((res) => {
        setFilteredProducts(res.payload);
      });
      setCreateProductWindow(false);
      setCurrentProduct(null);
      setImages([]);
      toast.success(res.payload.message);
      setInputs([{ key: "", value: "" }]);
    } else {
      console.log(res.payload.message);
      toast.error(res.payload.message);
    }
  }):
  dispatch(addNewProduct(formData)).then((res) => {
    if (res.payload.success) {
      setFormData(initialData);
      setImages([]);
      dispatch(getProducts()).then((res) => {
        setFilteredProducts(res.payload);
      });
      setCreateProductWindow(false);
      toast.success(res.payload.message);
      setInputs([{ key: "", value: "" }]);
    } else {
      console.log(res.payload.message);
      toast.error(res.payload.message);
    }
  });
  };



  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (res.payload.success) {
        dispatch(getProducts());
        toast.success(res.payload.message);
      } else {
        console.log(res.payload.message);
        toast.error(res.payload.message);
      }
    });
  }

 
  const handleSearch = (e) => {
    setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase())));
  }




  return (
    <div className='flex flex-col min-h-screen relative gap-5'>
      <button onClick={() => setCreateProductWindow(true)} className='p-2 bg-neutral-800 outline-2 outline-fuchsia-600 rounded-2xl self-end m-5 text-white font-bold cursor-pointer'>Add Product</button>
      <div className='flex items-center w-full p-5 justify-end relative'>
        <input onChange={e => handleSearch(e)} type="text" placeholder='Search...' className='p-2 outline-2 w-full lg:w-1/2 t bg-white outline-fuchsia-600 rounded-2xl' />
        <FaSearch  className='text-2xl text-black absolute right-7 cursor-pointer'/>
      </div>

      {createProductWindow ? 
      <div className='fixed inset-0 flex items-center z-1 justify-center overflow-scroll'>
        <div onClick={() => {setCreateProductWindow(false); setCurrentProduct(null); setFormData(initialData); setImages([])}}  className='fixed inset-0 bg-black opacity-80 z-2 w-full h-full'></div>
        <div className='bg-neutral-800 z-3 w-1/2 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
          <h1  className='text-2xl text-white  font-bold'>Create Product</h1>
          <button onClick={() => {setCreateProductWindow(false); setCurrentProduct(null); setFormData(initialData); setImages([])}} className='p-2 text-white  font-bold cursor-pointer'>X</button>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-2 mt-5' >
          <ImageUploader productImages={productImages}  formData={formData} images={images} setImages={setImages} currentProduct={currentProduct} />
          <input required onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData?.title || ''} type="text" placeholder='Product name' className='p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl' />
          <input onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData?.price || ''} type="number" placeholder='Regular price' className='p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl' />
          <input required onChange={(e) => setFormData({...formData, salePrice: e.target.value})} value={formData?.salePrice || ''}  type="number" placeholder='Sale price' className='p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl' />
          <input required onChange={(e) => setFormData({...formData, quantity: e.target.value})} value={formData?.quantity || ''} type="number" placeholder='Product quantity' className='p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl' />
          <p className='text-white text-lg'>Category</p>
          <select onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData?.category || 'Home-appliance'} className='p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl'>
            {categories.map(item => <option key={item.name} value={item.name}>{item.name}</option>) }
          </select>
            <CharacteristicsInputs formData={formData} inputs={inputs} setInputs={setInputs} setFormData={setFormData} currentProduct={currentProduct} />
          <textarea onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData?.description || ''} placeholder='Product description' className='p-2 min-h-50 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 rounded-2xl'></textarea>
          <button className='p-2 bg-neutral-800 outline-2 w-full outline-fuchsia-600 rounded-sm text-white font-bold cursor-pointer'>{currentProduct !== null ? 'Update' : 'Create'}</button>
        </form>
        </div>
      </div> : null}
      <div className='grid mb-20 sm:mb-5 sm:grid-cols-2 xl:grid-cols-3 my-5 sm:gap-8 justify-items-center gap-40'>
        {filteredProducts.map(item => <AdminProductsCard setFormData={setFormData} formData={formData} setProductImages={setProductImages} setCreateProductWindow={setCreateProductWindow} handleDelete={handleDelete} setCurrentProduct={setCurrentProduct} key={item._id} product={item} />  )}
      </div>
    </div>
  )
}

export default AdminProducts