import './App.css';
import React, {useState, useEffect} from 'react';
import AddContact from './Components/AddContact';
import ContactList from './Components/ContactList';
import Header from './Components/Header';

function App() {
  // const key = "contacts"
  // const [contact, setContact] = useState([])
  const addContactHandler = (contact) =>{
    console.log(contact)
    // setContact([...contact, contact])
  }

  // useEffect(() => {
  //  const retriveContacts = JSON.parse(localStorage.getItem(key));
  //  if(retriveContacts){ setContact([ retriveContacts])}

  // },[])

  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(contacts));

  // },[contacts])
  
const contacts =  [
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
      <Header/>
      <AddContact addContactHandler = {addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
