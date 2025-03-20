import React, { useEffect, useState } from 'react';
import { categories } from '../../../config/categoriesList';
import ProductCard from '../../Components/clientComponents/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../state/admin/productsSlice';



const Category = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productsList);
    const [filteredList, setFilteredList] = useState([]);
    const [category, setCategory] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    

    //sorting products by price and filtering by category
    const sortedProducts = products.map((product) => (product.salePrice)).sort((a,b) => a - b);
    let filteredProducts = products.filter((product) => category.includes(product.category));
    const sortedFilteredProducts = filteredProducts.map((product) => (product.salePrice)).sort((a,b) => a - b);

    //toggle category to see if the product was already selected or not and adding it to the array
    const toggleCategory = (item) => {
        if (category.includes(item)) {
            setCategory(category.filter((i) => i !== item));
        } else {
            setCategory([...category, item]);
        }
    }

    useEffect(() => {
        if (category.length === 0) {
            dispatch(getProducts()).then((res) => {
                setFilteredList(res.payload);
            })
        } else {
            setFilteredList(filteredProducts);
        }
        window.scrollTo(0, 0);
    }, [category, dispatch]);

          

    //sorting product by price in input range
    const handleSort = (e) => {
        const value = e.target.value;
        setCurrentPrice(value);
        if (category.length === 0 && sortedProducts[0]) {
            setFilteredList(products.filter(product => product.salePrice >= value));
        } else if (category.length !== 0) {
            setFilteredList(filteredProducts.filter(product => product.salePrice >= value));
        } else {
            setFilteredList(products.filter(product => product.salePrice <= value));
        }
    }

    //searching product
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setFilteredList(products.filter(product => product.title.toLowerCase().includes(value)));
    }

    //sorting product by price for smaller screen
    const handleSortByValue = (e) => {
        if (e.target.value === "Low to High") {
            setFilteredList(filteredList.map((product) => product).sort((a, b) => a.salePrice - b.salePrice));
        } else if (e.target.value === "High to Low") {
            setFilteredList(filteredList.map((product) => product).sort((a, b) => b.salePrice - a.salePrice));
        }
    }

  return (
    <div className='flex justify-start gap-0.5 relative lg:gap-5'>
        <div className='bg-neutral-900 min-h-screen' >
            <div className='flex flex-col  text-white sticky top-0 sm:p-5 gap-2'>
                <h1 className='md:text-2xl font-bold'>Categories</h1>
                <input onChange={(e) => handleSearch(e)} className='p-2 rounded-2xl bg-neutral-300 text-black placeholder:text-black w-full focus:outline-0' type="text" name='search' placeholder='Search' />
                {
                    categories.map((category) => (
                        <div key={category.name} className='flex w-full items-center gap-2'>
                            <input onChange={() => toggleCategory(category.name)}className='cursor-pointer appearance-none w-3 h-3 border bg-white border-gray-300 rounded-full checked:bg-fuchsia-500 checked:border-indigo-500' type="checkbox"/>
                            <p className='font-bold'>{category.name.split('&').join(' & ')}</p>
                        </div>
                    ))
                }
                <div className='hidden md:flex flex-col gap-2 mt-5 '>
                    <h1 className='text-2xl font-bold'>Price</h1>
                    <div className='flex gap-2 bg-neutral-300 rounded-3xl p-2'>
                     <p className='font-bold text-indigo-500'>{currentPrice !== null ? currentPrice : category.length === 0 ? sortedProducts[0] : sortedFilteredProducts[0]}$</p>
                     <input onChange={(e) => handleSort(e)} className='appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[-407px_0_0_407px_#c116cc] [&::-webkit-slider-thumb]:bg-white  outline-none w-full bg-white overflow-hidden rounded-4xl' min={category.length === 0 ? sortedProducts[0] : sortedFilteredProducts[0]} max={category.length === 0 ? sortedProducts.slice(-1) : sortedFilteredProducts.slice(-1)} name='range' type="range" />
                     <p className='font-bold text-indigo-700'>{category.length === 0 ? sortedProducts.slice(-1) : sortedFilteredProducts.slice(-1)}$</p>
                    </div>
                </div>
                <div className='flex flex-col md:hidden gap-2 mt-5 bg-neutral-700 items-center p-2 '>
                    <p>Sort by</p>
                    <select onChange={(e) => handleSortByValue(e)} className='bg-black outline-none rounded-2xl p-2'>
                        <option value="Low to High">Low to High</option>
                        <option value="High to Low">High to Low</option>
                    </select>
                </div>          
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-10 lg:p-5 mt-5 mb-10'>
            {
                filteredList.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
        </div>
            
    </div>
  )
}

export default Category