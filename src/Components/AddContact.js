import React from 'react'
import { useState } from 'react'

const AddContact = (props) => {
  const [contacts, setContacts] = useState({name:"", email:""});

  const handleChange = (e) =>{
    setContacts({...contacts,[e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) =>{
       e.preventDefault();
       if(contacts.name==="" || contacts.email === ""){
         return alert("All the fields are mandatory!");
       } 
      //  console.log(contacts);
       props.addContactHandler(contacts);

       setContacts({ name:"", email:""});

  }
 
  

  return (
    <div className='border border-spacing-2 p-10 grid justify-center'>
        <h2 className='bg-slate-300 text-center p-2 text-lg font-medium border border-1 border-red-600'>Add Contact</h2>
        <form className='' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 pt-4 '>
                <label className='text-md font-medium'>Name</label>
                <input type="text" name='name' placeholder='Name' value={contacts.name} onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
            </div>
            <div className='grid grid-cols-1 pt-4'>
                <label className='text-md font-medium'>Email</label>
                <input type="email" name='email' placeholder='Email' value={contacts.email} onChange={handleChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1'/>
            </div>
            <button className='button bg-green-600 text-white mt-4 px-6 py-2 rounded-lg hover:bg-green-700'>Add</button>
        </form>
    </div>
  )
}

export default AddContact