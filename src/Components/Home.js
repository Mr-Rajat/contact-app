import React from 'react'

import AddContact from './AddContact';
import ContactList from './ContactList';
import Header from './Header';

const Home = () => {

  const addContactHandler = (contact) => {
    console.log(contact)
    // setContact([...contact, contact])
  }

  const contacts = [
    {
      id: "1",
      name: "Rajat",
      email: "rajat@gmail.com",
      image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
    },
    {
      id: "2",
      name: "Neeraj",
      email: "neeraj@gmail.com",
      image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
    },
    {
      id: "3",
      name: "Shiv",
      email: "shiv@gmail.com",
      image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
    }
  ]
  return (
    <div className='container mx-auto'>

      {localStorage.getItem('authToken1') ?
        <div>
          <Header />
          <AddContact addContactHandler={addContactHandler} />
          <ContactList contacts={contacts} />
        </div>
        :
        <div className='text-center font-bold text-4xl'>Need to login or signup</div>}

      {/* <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} /> */}

    </div>
  )
}

export default Home