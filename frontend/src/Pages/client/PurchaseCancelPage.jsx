import { GoXCircleFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const PurchaseCancelPage = () => {
        const { user } = useSelector((state) => state.auth);
    
        const [error, setError] = useState(null);
    
        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        const orderId = new URLSearchParams(window.location.search).get("order");
        const handleCheckoutSuccess = async (sessionId, orderId) => {
            try {
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/update/stripe`,{userId:user?.id, orderId: orderId, sessionId: sessionId}).then(res => {
                    console.log(res)
                })
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }
        }
        useEffect(() => {
            handleCheckoutSuccess(sessionId, orderId);
        }, [user]);
    
        if (error) return `Error: ${error}`;
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<GoXCircleFill className='text-red-500 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2'>Purchase Cancelled</h1>
					<p className='text-gray-300 text-center mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='space-y-4'>
						<Link
							to={"/home"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
						>
							<IoIosArrowDropleftCircle className='mr-2' size={18} />
							Return to Shop
						</Link>
					</div>
				</div>
		</div>
	);
};

export default PurchaseCancelPage;