import React from 'react'

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='container mx-auto bg-slate-400'>

    <div class="flex justify-between ">
  <div className='flex flex-row gap-2'>
    <Link to="/" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>Home</Link>
    <Link className='bg-blue-400 p-3 text-white hover:bg-blue-700'>About</Link>
  </div>
  <div className='flex flex-row gap-2'>
    {}
  <Link to="/userlogin" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>Login</Link>
    <Link to="/signup" className='bg-blue-400 p-3 text-white hover:bg-blue-700'>SignUp</Link>
  </div>
</div>
    </div>
  )
}

export default Navbar