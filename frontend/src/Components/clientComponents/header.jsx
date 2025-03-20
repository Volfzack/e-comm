import React, { useState } from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import logo from "../../assets/pc-logo-monogram-modern-design-template-free-vector.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../state/authSlice';
import { getProductsShop } from '../../state/shop/productsShopSlice';
import { RxCross1 } from "react-icons/rx";

const ClientHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, isAuthenticated} = useSelector(state => state.auth);
    const {cartItems} = useSelector(state => state.shopCart);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
        const handleLogout = () => {
            if (user && isAuthenticated){
            dispatch(logoutUser());
            setShow(false);
            window.location.reload();
            } else {
                navigate('/auth');
            }
            
        }

        const handleClearSearch = () => {
            setSearchedProducts([]);
            setSearch('');
            
        }
        const handleSearchProduct = (e) => {
            const value = e.target.value.toLowerCase();
            setSearch(value);    
                dispatch(getProductsShop()).then((res) => {
                    if (value === '') {
                        setSearchedProducts([]);
                    } else if (value !== '' && searchedProducts.length === 0) {
                    setSearchedProducts(res.payload.filter(product => product.title.toLowerCase().includes(value)));
                    } else {
                        setSearchedProducts(res.payload.filter(product => product.category.toLowerCase().includes(value)));
                    }
                })
            
        }
        
    const searchSubmit = (id) => {
        navigate(`/product/${id}`);
        setSearchedProducts([]);
        setSearch('');
       
    }

    const handleGoToOrders = () => {
        navigate('/orders');
        setShow(false);
    }

  return (
    <div className='w-full z-1 flex items-center  justify-between bg-black border-b-1 border-white text-white lg:p-10 sm:p-1'>
        <div className='flex items-center gap-3 w-1/4 '>
            <img onClick={() => navigate('/home')} className='w-10 h-10 sm:w-15 sm:h-15 rounded-[50%] border-2 border-white transform transition hover:lg:scale-120' src={logo} alt="" />
            <p onClick={() => navigate('/home')} className='lg:text-2xl md:text-xl font-bold sm:text-[12px] hidden sm:block cursor-pointer'>Electronic shop</p>
        </div>
        <div className='flex items-center relative lg:w-1/2 md:w-1/2 '>
            {location.pathname === '/categories' ? '' : <input  onChange={(e) => handleSearchProduct(e)} value={search} className='p-2  rounded-2xl bg-neutral-300 text-black placeholder:text-black w-full focus:outline-0' type="text" placeholder='Search' />}
            {location.pathname === '/categories' ? '' :  <RxCross1 className='right-[10px] absolute text-black cursor-pointer' style={searchedProducts.length === 0 ? {display: "none"} : {display: "block"}} onClick={() => handleClearSearch()} />}
            {searchedProducts.length !== 0 ? <div className='absolute top-[50px] flex flex-col gap-2 w-[250px] sm:w-full bg-black p-2 rounded-lg rounded-tr-none '>
                {searchedProducts.slice(0, 5).map(product =>
                    <div key={product._id} onClick={() => searchSubmit(product._id)}  className='flex items-center gap-2 cursor-pointer'>
                      <img className='w-15 h-15 rounded-[50%] border-2 border-neutral-600' src={product.images[0]} alt="" />
                      <p>{product.title}</p>
                    </div>)}
            </div> : null}
        </div>
        <div className='lg:w-1/6 flex items-center gap-5'>
            <div className='flex items-center relative transform transition hover:-translate-y-1'>
                {cartItems.items?.length !== 0 && cartItems.length !== 0 ? <div className='red w-3 h-3 rounded-[50%] bg-red-600 absolute top-[-2px] right-[-5px] animate-pulse'></div> : null}
                <AiOutlineShoppingCart onClick={() => navigate('/cart')} className='cursor-pointer text-3xl ' />
            </div>
            <div className='flex items-center relative gap-2'>
                <FaHeart onClick={() => navigate('/favourites')} className='cursor-pointer text-2xl transform transition hover:-translate-y-1' />
                <FaUser onClick={() => setShow(!show)} className='cursor-pointer text-2xl transform transition hover:-translate-y-1' />
                <div className='w-[150px] h-15 rounded-lg rounded-tr-none bg-white absolute top-[40px] p-2 right-[100px]' style={{display: show ? "block" : 'none', right: isAuthenticated && user ? '100px' : '20px'}}>
                    <p onClick={() => handleGoToOrders()} className='cursor-pointer font-bold border-b-2 border-black text-black'>Orders</p>
                    <p onClick={handleLogout} className='cursor-pointer font-bold text-black'>{isAuthenticated && user ? 'Logout' : 'Login'}</p>
                </div>
                <p onClick={() => navigate('/admin/dashboard')} className='cursor-pointer text-lg transform outline-1 outline-gray-500 rounded-2xl px-2 py-0.5 transition hover:-translate-y-1' style={user?.role === 'admin' && isAuthenticated ? {display: 'block'} : {display: 'none'}}>Admin</p>
            </div>
        </div>
    </div>
  )
}

export default ClientHeader