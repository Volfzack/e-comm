import React from 'react';
import logo from "../../assets/pc-logo-monogram-modern-design-template-free-vector.jpg";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../state/authSlice';
import { useDispatch } from 'react-redux';




const AdminHeader = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/home');
        window.location.reload();
    }

  return (
    <div className='flex justify-between items-center w-full p-5 border-b-2 border-white'>
      <div className='flex items-center gap-3'>
        <img onClick={() => navigate('/admin/dashboard')} className='w-15 h-15 rounded-[50%] border-2 border-white transform transition hover:lg:scale-120 cursor-pointer' src={logo} alt="" />
        <h1 onClick={() => navigate('/admin/dashboard')} className='lg:text-2xl sm:text-[14px] font-bold text-white cursor-pointer'>Admin Dashboard</h1>
      </div>
        <button onClick={handleLogout} className='p-2 w-[150px] bg-fuchsia-600 rounded-2xl self-center  text-white font-bold cursor-pointer'>Logout</button>
    </div>
  )
}

export default AdminHeader