import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, signUp } from '../../state/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        lastName: ''
    });

    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: ''
    });

    const [login, setLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const onSubmit = () => {
        dispatch(signUp(formData)).then((res) => {
            if (res.payload.success) { 
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message);
            }
        })
    };

    const onSubmitLogin = () => {
        dispatch(loginUser(formDataLogin)).then((res) => {
            if (res?.payload?.success) { 
                toast.success(res.payload.message);
            }  else {
                setTimeout(() => {window.location.reload()}, 2000);
                toast.error(res.payload.message);
            }
            
        });
    }

  return (
    <div className='flex justify-center items-center min-h-screen min-w-screen bg-linear-to-bl from-lime-500 via-blue-500 to-purple-500 '>
        <div className='flex h-[500px] lg:w-[800px] w-[400px] rounded-2xl bg-neutral-200'>
            <div className={login ? "flex px-1.5 w-1/2 rounded-2xl" : "flex px-1.5  w-1/2 bg-purple-500 rounded-l-2xl"}>
                {login ? (
                    <div className='flex flex-col gap-5 w-full h-full items-center justify-center px-5 pb-10 ' >
                        <h1 className='text-3xl font-bold'>Sign in</h1>
                        <input value={formDataLogin.email} onChange={(e) => setFormDataLogin({...formDataLogin, email: e.target.value})} type="mail" placeholder='Enter your mail' className='p-2 bg-gray-300 w-full rounded-md' />
                        <input value={formDataLogin.password} onChange={(e) => setFormDataLogin({...formDataLogin, password: e.target.value})} type="password" placeholder='Enter your password' className="p-2 bg-gray-300 w-full rounded-md" />
                        <button onClick={() => onSubmitLogin()} className='p-2 bg-purple-400 w-3/4 rounded-md hover:bg-purple-600 text-white font-bold'>Sign in</button>
                     </div>
                ) : (
                    <div className='flex flex-col gap-5 w-full h-full items-center justify-center px-5 pb-10' >
                         {!login ? <h1 className='text-3xl font-bold animate-pulse text-center text-white'>Welcome back! Kindly, enter your details to login </h1> : <h1 className='text-3xl font-bold animate-pulse text-center text-white'>Hello! Kindly, enter your details to sign up </h1>}
                         {!login ? <button onClick={() => setLogin(!login)} className='p-2 bg-neutral-600 w-3/4 rounded-md hover:bg-neutral-800 text-white font-bold'>Sign In</button> : <button onClick={() => setLogin(!login)} className='p-2 bg-neutral-600 w-3/4 rounded-md hover:bg-neutral-800 text-white font-bold'>Sign Up</button>}
                     </div>
                )}
                
            </div>
            <div className={!login ? "flex px-1.5 w-1/2 rounded-2xl" : "flex px-1.5  w-1/2 bg-purple-500 rounded-r-2xl"}>
            {!login ? (
                    <div className='flex flex-col gap-5 w-full h-full items-center justify-center px-5 pb-10' >
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        <input value={formData.name} onChange={(e) =>setFormData({...formData, name: e.target.value})} type="text" placeholder='Enter your name' className="p-2 bg-gray-300 w-full rounded-md" />
                        <input value={formData.lastName} onChange={(e) =>setFormData({...formData, lastName: e.target.value})} type="text" placeholder='Enter your last name' className="p-2 bg-gray-300 w-full rounded-md" />
                        <input value={formData.email} onChange={(e) =>setFormData({...formData, email: e.target.value})} type="mail" placeholder='Enter your mail' className='p-2 bg-gray-300 w-full rounded-md' />
                        <input value={formData.password} onChange={(e) =>setFormData({...formData, password: e.target.value})} type="password" placeholder='Repeat your password' className="p-2 bg-gray-300 w-full rounded-md" />
                        <button onClick={() => onSubmit()} className='p-2 bg-purple-400 w-3/4 rounded-md hover:bg-purple-600 text-white font-bold'>Sign Up</button>
                     </div>
                ) : (
                    <div className='flex flex-col gap-5 w-full h-full items-center justify-center px-5 pb-10' >
                        {!login ? <h1 className='text-3xl font-bold animate-pulse text-center text-white'>Welcome back! Kindly, enter your details to login </h1> : <h1 className='text-3xl font-bold animate-pulse text-center text-white'>Hello! Kindly, enter your details to sign up </h1>}
                        {!login ? <button onClick={() => setLogin(!login)} className='p-2 bg-neutral-600 w-3/4 rounded-md hover:bg-neutral-800 text-white font-bold'>Sign In</button> : <button onClick={() => setLogin(!login)} className='p-2 bg-neutral-600 w-3/4 rounded-md hover:bg-neutral-800 text-white font-bold'>Sign Up</button>}
                     </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default LoginSignup