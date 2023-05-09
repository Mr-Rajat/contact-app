import React, {useState} from 'react'

const Login = () => {
  const [credential, setCredential ] = useState({email:"", password:""})

  const handleChange = (e) =>{
    setCredential({...credential,[e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(credential.password==="" || credential.email === ""){
     alert("All the fields are mandatory!");
     return
    } 
   //  console.log(contacts);
    // props.addContactHandler(contacts);
    alert("Success");

    // setContacts({ name:"", email:""});

}

  return (
    <div className=' p-10 grid justify-center'>
    <h2 className='bg-slate-300 text-center p-2 text-lg font-medium border border-1 border-red-600'>Login</h2>

    <form className='' onSubmit={handleSubmit}>

        <div className='grid grid-cols-1 pt-4'>
            <label className='text-md font-medium'>Email</label>
            <input type="email" name='email' placeholder='Email' value={credential.email} autocomplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1'/>
        </div>

        <div className='grid grid-cols-1 pt-4 '>
            <label className='text-md font-medium'>Name</label>
            <input type="password" name='password' placeholder='Password' value={credential.password} autocomplete="off" onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
        </div>

        <button className='button bg-green-600 text-white mt-4 px-6 py-2 rounded-lg hover:bg-green-700'>Login</button>
    </form>
</div>
  )
}

export default Login