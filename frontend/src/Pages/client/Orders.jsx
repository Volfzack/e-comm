import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../state/shop/ordersSlice'
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

const Orders = () => {

  const {user, isAuthenticated} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated && user) {
        dispatch(getOrders(user.id))
    }
  }, [user, dispatch]);

  const {orderItems} = useSelector((state) => state.shopOrders);

    const [currentPage, setCurrentPage] = useState(1);
  
    const ordersPerPage = 10;
  
    const totalPages = Math.ceil(orderItems?.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderItems?.slice(indexOfFirstOrder, indexOfLastOrder);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

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

  return (
      <div className="min-h-screen p-1 md:p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-neutral-600">
                  <h2 className="text-lg font-semibold text-white">Orders</h2>
              </div>
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-neutral-600">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Order ID
                              </th>
                              <th scope="col" className="px-6 py-3 hidden lg:table-cell text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Date
                              </th>
                              <th scope="col" className="px-6 py-3 hidden lg:table-cell text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 hidden lg:table-cell text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Total
                              </th>
                              <th scope="col" className="sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Status
                              </th>
                              <th scope="col" className="px-6 py-3 hidden md:table-cell text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Detail view
                              </th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {orderItems?.length ? currentOrders?.map((order) => (
                              <tr  onClick={() => navigate(`/order/${order._id}`)} key={order._id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{order._id}</div>
                                  </td>
                                  <td className="px-6 hidden lg:table-cell py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{order.createdAt.slice(0, 10)}</div>
                                    </td>
                                    <td className="px-6 hidden lg:table-cell py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{order.itemsQuantity}</div>
                                    </td>
                                    <td className="px-6 hidden lg:table-cell py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">${order.total}</div>
                                    </td>
                                    <td className="sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 hidden md:table-cell py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <button
                                            onClick={() => navigate(`/order/${order._id}`)}
                                            className="text-fuchsia-600 hover:text-fuchsia-900"
                                        >
                                            Order details
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={6} className="text-center py-4">No orders found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-white">
                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orderItems?.length)} of {orderItems?.length} orders
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-gray-50"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-gray-50"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
        </div>
    );
};

export default Orders