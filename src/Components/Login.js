import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({ email: "", password: "" })
  const userLogin = useSelector(state => state.userAuth.success);

  const navigate = useNavigate();

  useEffect(() => {
    // const authToken = localStorage.getItem('authToken1');
    // console.log(authToken)
    if (userLogin) {
      // console.log(authToken)
      navigate('/')
    }

  }, [userLogin])


  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credential.password === "" || credential.email === "") {
      return alert("All the fields are mandatory!");
    }
    // console.log(credential);
    dispatch(actionCreators.userAuth(credential));

    setCredential({ email: "", password: "" })
    // console.log(userLogin);

  }

  return (
    <div className=' p-10 grid justify-center'>
      <h2 className='bg-slate-300 text-center p-2 text-lg font-medium border border-1 border-red-600'>Login</h2>

      <form className='' onSubmit={handleSubmit}>

        <div className='grid grid-cols-1 pt-4'>
          <label className='text-md font-medium'>Email</label>
          <input type="email" name='email' placeholder='Email' value={credential.email} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
        </div>

        <div className='grid grid-cols-1 pt-4 '>
          <label className='text-md font-medium'>Name</label>
          <input type="password" name='password' placeholder='Password' value={credential.password} autoComplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
        </div>

        <button className='button bg-green-600 text-white mt-4 px-6 py-2 rounded-lg hover:bg-green-700'>Login</button>
      </form>
    </div>
  )
}

export default Login