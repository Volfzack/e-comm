import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../Components/clientComponents/ProductCard';
import { fetchFavouriteItems } from '../../state/shop/favouritesSlice';

const Favourites = () => {
    const [favoriteList, setFavoriteList] = useState([]);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const {favouriteItems} = useSelector((state) => state.favourites);
    
    


    useEffect(() => {
        if(user && isAuthenticated){
        dispatch(fetchFavouriteItems(user.id)).then((res) => {
            setFavoriteList(res.payload.data.items.filter((product) => product.productId).sort((a, b) => a.productId.salePrice - b.productId.salePrice));
        })
}
    }, [dispatch, user]);
    
    const handleSortByValue = (e) => {
        if (e.target.value === "Low to High") {
            setFavoriteList(favouriteItems?.items?.filter((product) => product.productId).sort((a, b) => a.productId.salePrice - b.productId.salePrice));
        } else if (e.target.value === "High to Low") {
            setFavoriteList(favouriteItems?.items?.filter((product) => product.productId).sort((a, b) => b.productId.salePrice - a.productId.salePrice));
        }
    }
  return (
    <div className='flex flex-col min-h-screen items-center p-10'>
        <div className='flex flex-col w-full items-center gap-5 justify-top bg-neutral-700 rounded-2xl p-2'>
            <div className='flex w-full items-center gap-2 sm:gap-0 justify-between border-b-1 border-gray-400 p-2'>
                <h1 className='text-lg sm:text-2xl font-bold text-white'>Favourites</h1>
                <select onChange={(e) => handleSortByValue(e)} className='bg-black outline-none text-white rounded-2xl p-2'>
                    <option value="Low to High">Low to High</option>
                    <option value="High to Low">High to Low</option>
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-10 lg:p-5 mt-5 mb-10'>
                {favoriteList !== null || favoriteList !== undefined ? favoriteList?.map((product) => <ProductCard key={product.productId._id} product={product.productId}  />) : null }
            </div>
        </div>
    </div>
  )
}

export default Favourites