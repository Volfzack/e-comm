import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { getOrderDetails, cancelOrder } from '../../state/shop/ordersSlice'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const OrderDetails = () => {
  const dispatch = useDispatch();
  const {orderId} = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState([])

  useEffect(() => {
    dispatch(getOrderDetails(orderId)).then((res) => {
      setOrder(res.payload);
    });
  }, [dispatch, orderId]);

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId)).then((res) => {
      if (res.payload.success) {
        navigate('/orders');
      }
    })
  };

  return (
    <div className="text-white w-full h-screen shadow-md p-6">

      <div className="grid grid-cols-1 sm:flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Order № {order?._id}</h2>
          <p className="text-sm">Date: {order?.createdAt && order?.createdAt.slice(0,10)}</p>
        </div>
        <span className="bg-green-100 text-green-800 w-fit font-medium px-2 py-0.5 rounded-full">
          {order?.status}
        </span>
      </div>

 
      <ul className="mb-4">
        {order?.items && order?.items.map((item) => (
          <li key={item.name} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
            <img src={item.image} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h3 className="text-md font-medium">{item.name}</h3>
              <p className="text-sm">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{item.price}$</p>
            </div>
          </li>
        ))}
      </ul>


      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span className="font-semibold text-lime-500">FREE</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Payment:</span>
          <span className={ order?.paymentStatus === 'Paid' ? `font-semibold text-lime-500` : `font-semibold text-red-500`}>{order?.paymentStatus}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className='text-fuchsia-500'>Total:</span>
          <span className='text-fuchsia-500'>{order?.total}$</span>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className="mt-6 text-center">
          <button onClick={() => navigate('/orders')} className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-1 sm:px-4 rounded">
            Go back to orders
          </button>
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => handleCancelOrder()} className={`${order?.status === 'Delivered' || order?.status === 'Cancelled' ? 'hidden' : ''} bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-1 sm:px-4 rounded`}>
            Cancell order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails