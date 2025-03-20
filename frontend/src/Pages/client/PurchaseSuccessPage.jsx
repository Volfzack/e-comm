import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { FaCheckCircle } from "react-icons/fa";
import { PiHandHeartFill } from "react-icons/pi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, fetchCartItems } from "../../state/shop/cartSlice";
import axios from "axios";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
    const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [error, setError] = useState(null);
	
	const sessionId = new URLSearchParams(window.location.search).get("session_id");
	const orderId = new URLSearchParams(window.location.search).get("order");
	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId, orderId) => {
			try {
				await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/update/stripe`,{orderId: orderId, sessionId: sessionId})
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		if (sessionId) {
			handleCheckoutSuccess(sessionId, orderId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, []);

	useEffect(() => {
		dispatch(fetchCartItems(user?.id)).then((res) => { if (res.payload.success) dispatch(clearCart(user?.id)) });
	}, [user]);

	if (isProcessing) return <div className="h-screen text-white flex items-center justify-center px-4 text-4xl" >Processing...</div>;

	if (error) return <div className="h-screen text-white flex items-center justify-center px-4 text-3xl" >Error: {error}</div>;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<FaCheckCircle  className='text-fuchsia-500 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-fuchsia-500 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-fuchsia-500 text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-gray-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-gray-400'>Order number</span>
							<span className='text-sm font-semibold text-fuchsia-500'>#{orderId}</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-400'>Estimated delivery</span>
							<span className='text-sm font-semibold text-fuchsia-500'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<PiHandHeartFill className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/orders"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-fuchsia-500 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Check your orders
							<IoIosArrowDroprightCircle  className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;