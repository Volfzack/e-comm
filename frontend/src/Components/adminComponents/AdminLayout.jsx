import React from 'react';
import { Outlet } from 'react-router-dom';
import Adminsidebar from './sidebar';
import AdminHeader from './header';

const AdminLayout = () => {
  return (
    <div className='flex flex-col bg-black'>
            <AdminHeader className='w-full' />
            <main className='flex'>
                <div className='border-r-2  border-white'>
                  <Adminsidebar />
                </div>
                <div className='w-full min-h-screen bg-neutral-800'> 
                  <Outlet />
                </div>  
            </main>

    </div>
  )
}

export default AdminLayout