import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
// import axios from 'axios'

export default function Signin() {
  const [ formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
        
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return
      }
      if(data.role === 'admin'){
        dispatch(signInSuccess(data))
        navigate('/dashboard')
      }else{
        dispatch(signInSuccess(data))
        navigate('/')
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" id="email" onChange={handleChange} placeholder='Email'
        className='border p-3 rounded-lg'/>
        <input type="password" id="password" onChange={handleChange} placeholder='Password'
        className='border p-3 rounded-lg'/>

        <button type='submit' disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign in'}</button>
        <OAuth />

      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
            <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}