import React from 'react'
import { useDispatch } from 'react-redux';
import {actionCreators} from '../redux';

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken1');
    dispatch(actionCreators.userLogout());
    navigate('/userlogin');
  }

  return (
    <div className='container mx-auto bg-slate-400'>

      <div className="flex justify-between ">
        <div className='flex flex-row gap-2'>
          <Link to="/" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>Home</Link>
          <Link className='bg-blue-400 p-3 text-white hover:bg-blue-700'>About</Link>
        </div>

        {!localStorage.getItem('authToken1') ? <div className='flex flex-row gap-2'> <Link to="/userlogin" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>Login</Link>
          <Link to="/signup" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>SignUp</Link> </div>
          : <button className='bg-blue-400 text-white p-3 hover:bg-blue-700' onClick={handleLogout} >Logout</button>}


      </div>
    </div>
  )
}

export default Navbar