import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getOrdersAdmin, updateOrderStatusAdmin, deleteOrderAdmin} from '../../state/admin/ordersAdminSlice';
import { FiX, FiPackage, FiUser, FiCreditCard, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { toast } from 'react-toastify';
import { IoTrashBin } from "react-icons/io5";

const AdminOrders = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersAdmin()).then(res => {if (!res.payload.success) toast.error(res.payload.message)});
  }, [dispatch]);
  const {orderAdminItems} = useSelector(state => state.ordersAdmin);

 


  const statusOptions = ['Processing', 'Shipping', 'Delivered'];
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 10;

  const totalPages = Math.ceil(orderAdminItems?.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderAdminItems.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };
  
  let order = orderAdminItems.find(order => order._id === selectedOrder);

  const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Delivered':
            return 'bg-green-100 text-green-800';
        case 'Processing':
            return 'bg-blue-100 text-blue-800';
        case 'Shipping':
            return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getPaymentStatusBadgeClass = (paymentStatus) => {
  switch (paymentStatus) {
      case 'Paid':
          return 'text-lg font-bold text-emerald-500';
      case 'Pending':
          return 'text-lg font-bold text-fuchsia-500';
      case 'Unpaid':
          return 'text-lg font-bold text-red-500';
      default:
          return 'text-lg font-bold text-gray-800';
  }
};

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatusAdmin({orderId: orderId, status: newStatus})).then((res) => {
      if (res.payload.success){
        dispatch(getOrdersAdmin());
      } else {
        toast.error(res.payload.message);
      }
  });
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrderAdmin(orderId)).then((res) => {
      if (res.payload.success){
        dispatch(getOrdersAdmin());
      } else {
        toast.error(res.payload.message);
      }
  });
  }


  {return !showDetails ?  (
    <div className="container md:mx-auto p-4">
      {/* layout for large screens */}
      <div className="bg-neutral-500 hidden lg:block text-white rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
              <th className="py-3 px-1 text-left">Order #</th>
              <th className="py-3 px-1 text-left">Order date</th>
              <th className="py-3 px-1 text-left">Client ID</th>
              <th className="py-3 px-1 text-center">Status</th>
              <th className="py-3 px-1 text-left">Payment</th>
              <th className="py-3 px-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody  className="text-sm font-light">
            {currentOrders?.map((order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td onClick={() => handleOrderClick(order._id)} className="py-3 px-1 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span>{order._id}</span>
                  </div>
                </td>
                <td onClick={() => handleOrderClick(order._id)} className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span>{order.createdAt.slice(0, 10)}</span>
                  </div>
                </td>
                <td onClick={() => handleOrderClick(order._id)} className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span>{order.userId}</span>
                  </div>
                </td>
                <td onClick={() => handleOrderClick(order._id)} className="py-3 px-1 text-center">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span className={`p-2 inline-flex leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                  </span>
                </td>
                <td onClick={() => handleOrderClick(order._id)} className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span className={`${getPaymentStatusBadgeClass(order.paymentStatus)}`}>{order.paymentStatus}</span>
                  </div>
                </td>
                <td className="py-3 px-1 text-center">
                  <div className="flex justify-center">
                    <div className="mr-2">
                      <select
                        className="block text-black appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                      <IoTrashBin onClick={() => handleDelete(order._id)} className='text-xl self-center cursor-pointer text-red-500' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between">
              <div className="text-sm p-1 text-black">
                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orderAdminItems.length)} of {orderAdminItems.length} orders
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
      </div>
      {/* for mobile */}
      <div className="bg-neutral-500 divide-y divide-gray-200 grid grid-cols-1 lg:hidden text-white rounded my-6">
        {currentOrders?.map((order) => (
          <div key={order._id} className="p-2">
            <div className="flex gap-3 flex-col">
              <p onClick={() => handleOrderClick(order._id)} className='text-white text-xs md:text-lg'>Order # <span className='text-fuchsia-500 text-xs md:text-lg'>{order._id}</span></p>
              <p onClick={() => handleOrderClick(order._id)} className='text-white text-xs md:text-lg'>Date: <span className='text-fuchsia-500 text-xs md:text-lg'>{order.createdAt.slice(0, 10)}</span></p>
              <p onClick={() => handleOrderClick(order._id)} className='text-white text-xs md:text-lg'>Client ID: <span className='text-fuchsia-500 text-xs md:text-lg'>{order.userId}</span></p>
              <p onClick={() => handleOrderClick(order._id)} className='text-white text-xs md:text-lg'>Payment: <span className='text-fuchsia-500 text-xs md:text-lg'>{order.paymentStatus}</span></p>
              <span className={`${getStatusBadgeClass(order.status)} w-fit font-medium px-2 py-0.5 rounded-full`}>
                {order?.status}
               </span>
              <div className="flex flex-col mt-5 gap-5 justify-center">
                <div className="w-32">
                  <p className='text-white text-xs md:text-lg mb-2'>Change order status</p>
                <select
                        className="block text-black appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                </div>
                <IoTrashBin onClick={() => handleDelete(order._id)} className='text-xl cursor-pointer text-red-500' />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 flex items-center justify-between">
              <div className="text-sm p-1 text-black">
                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orderAdminItems?.length)} of {orderAdminItems?.length} orders
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div onClick={() => setShowDetails(false)} className='fixed inset-0 bg-black opacity-80 z-2 w-full h-full'></div>
    <div className="bg-neutral-300 z-50 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <button
            onClick={() => setShowDetails(false)}
            className="text-black hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiPackage className="text-gray-500 mr-2" />
                <h3 className="font-semibold text-black">Order Summary</h3>
              </div>
              <p className="text-sm text-black">Order ID: {order._id}</p>
              <p className="text-sm text-black">Date: {order.createdAt.slice(0, 10)}</p>
              <p className="text-sm text-black">Total: ${order.total}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiUser className="text-gray-500 mr-2" />
                <h3 className="font-semibold text-black">Customer Details</h3>
              </div>
              <p className="text-sm text-black">Customer ID: {order.userId}</p>
              <p className="text-sm text-black">Phone: {order.userPhone}</p>
              {order.shippingAddress && (
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-sm text-black">Address: {order.shippingAddress.address}</p>
                  <p className="text-sm text-black">City: {order.shippingAddress.city}</p>
                  <p className="text-sm text-black">Postal Code: {order.shippingAddress.postalCode}</p>
                  <p className="text-sm text-black">Country: {order.shippingAddress.country}</p>

                </div>
              )}
            </div>
          </div>


            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiCreditCard className="text-black mr-2" />
                <h3 className="font-semibold text-black">Payment Details</h3>
              </div>
              <p className="text-sm text-black">Method: <span className={`${order.paymentMethod === 'Stripe' ? 'text-fuchsia-500' : 'text-blue-800'}`}>{order.paymentMethod}</span></p>
              <p className="text-sm text-black">Status: <span className={`${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus}</span></p>
            </div>
          </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Products</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {order.items.map((product, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <img className='w-12 h-12 md:w-20 md:h-20 rounded-lg' src={product.image} alt="" />
                <span className="text-sm text-black">{product.name}</span>
                <span className="text-sm text-black">
                  {product.quantity}x <span className='text-emerald-500'>${product.price.toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );}
};


export default AdminOrders