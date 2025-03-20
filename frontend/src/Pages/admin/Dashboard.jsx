import React, { useState, useEffect } from "react";
import { FiBox, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import { getAnalytics } from "../../state/admin/analyticsSlice";
import { useDispatch } from "react-redux";
import yummyEmoji from '../../assets/yummy-emoji.png'
import cryEmoji from '../../assets/cry-emoji.png'

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [soldProducts, setSoldProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [sales, setSales] = useState(0)
  useEffect(() => {
    dispatch(getAnalytics()).then((res) => {setSoldProducts(res.payload.products); setTotalOrders(res.payload.orders); setSales(res.payload.sales); setIsLoading(false)});
  },[dispatch]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-neutral-400 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-1">Total Products</p>
              <h2 className="text-3xl font-bold text-white">{soldProducts}</h2>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiBox className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-400 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-400 mb-1">Sold Items</p>
              <h2 className="text-3xl font-bold text-white">{totalOrders}</h2>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-400 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 mb-1">Total Revenue</p>
              <h2 className="text-3xl font-bold text-white">
                {sales.totalSales}
              </h2>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-400 items-center p-6 h-[500px] rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl text-fuchsia-500 mb-1">Revenue</p>
            </div>
              <p className="text-2xl text-emerald-400">+{sales.totalRevenue.toLocaleString("en-US")}$</p>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <img className="w-full h-[300px] mt-10 object-contain" src={sales.totalRevenue > 0 ? yummyEmoji : cryEmoji} alt="" />
        </div>



      </div>

  );
};

export default AdminDashboard