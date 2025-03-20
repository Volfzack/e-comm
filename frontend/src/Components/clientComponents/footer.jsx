import React from 'react';
import logo from "../../assets/pc-logo-monogram-modern-design-template-free-vector.jpg";


const Footer = () => {
  return (
    <div className='w-full flex items-top justify-between bg-black border-t-1 border-white text-white lg:p-10 sm:p-1'>
        <div className='block w-1/4'>
            <img className='w-15 h-15 rounded-[50%] border-2 border-white transform transition hover:lg:scale-120' src={logo} alt="" />
            <p>© 2024 - 2025 Internet Solutions LLC (part of the group of companies; subsidiary of PC shop holding LLC) All rights reserved.</p>
        </div>
        <div className='block justify-center'>
            <h2 className='text-2xl'>Useful links</h2>
            <ul className='list-none text-center'>
                <li className='cursor-pointer'>Account</li>
                <li className='cursor-pointer'>Order</li>
                <li className='cursor-pointer'>Cart</li>
                <li className='cursor-pointer'>Favourites</li>
            </ul>
        </div>
        <div className='flex flex-col w-1/3'>
            <h2 className='text-2xl'>Contact us</h2>
            <form className='flex flex-col w-full gap-1'>
             <label>Your email</label>
             <input className='p-2 rounded-2xl bg-neutral-300 text-black placeholder:text-black w-full focus:outline-0' type="email" name='email' placeholder='Enter your email' />
             <label>Your Message</label>
             <textarea className='p-2 rounded-2xl bg-neutral-300 text-black placeholder:text-black w-full focus:outline-0' name="message" rows="6" placeholder='Enter your message'></textarea>
             <button className='p-2 bg-lime-500 sm:w-2/4 rounded-2xl self-center  text-white font-bold cursor-pointer' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Footer