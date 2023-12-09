import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ name: "", email: "", password: "", cpassword: "" })
  const userRegistered = useSelector(state => state.userAuth.registerStatus.success);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.cpassword) {
      setUserData({ password: "", cpassword: "" })
      return alert("Password and Confirm Password must be same");
    }
    // console.log(credential);
    dispatch(actionCreators.createUser(userData));

    setUserData({ name: "", email: "", password: "", cpassword: "" });
    // console.log(userLogin);

  }

  useEffect(() => {
    // const authToken = localStorage.getItem('authToken1');
    // console.log(authToken)
    if (userRegistered) {
      // console.log(authToken)
      console.log(userRegistered)
      alert("Your account created successfully");
      dispatch(actionCreators.createUser(userData));
      navigate('/userlogin')
      console.clear();
    }

  }, [userRegistered])

  return (
    <div className=' p-10 grid justify-center'>
      <h2 className='bg-slate-300 text-center p-2 text-lg font-medium border border-1 border-red-600'>Sign Up</h2>

      <form className='' onSubmit={handleSubmit}>

        <div className='grid grid-cols-1 pt-4'>
          <label className='text-md font-medium'>Name</label>
          <input type="text" name='name' placeholder='Name' value={userData.name} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' minLength={3} required />
        </div>

        <div className='grid grid-cols-1 pt-4'>
          <label className='text-md font-medium'>Email</label>
          <input type="email" name='email' placeholder='Email' value={userData.email} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' required />
        </div>

        <div className='grid grid-cols-1 pt-4 '>
          <label className='text-md font-medium'>Password</label>
          <input type="password" name='password' placeholder='Password' value={userData.password} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' minLength={5} required />
        </div>

        <div className='grid grid-cols-1 pt-4 '>
          <label className='text-md font-medium'>Confirm Password</label>
          <input type="password" name='cpassword' placeholder='Confirm Password' value={userData.cpassword} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' minLength={5} required />
        </div>

        <button className='button bg-green-600 text-white mt-4 px-6 py-2 rounded-lg hover:bg-green-700'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup