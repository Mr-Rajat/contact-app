import React, {useState, useEffect} from 'react';

import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  // const key = "contacts"
  // const [contact, setContact] = useState([])
  // const addContactHandler = (contact) =>{
  //   console.log(contact)
  //   // setContact([...contact, contact])
  // }

  // useEffect(() => {
  //  const retriveContacts = JSON.parse(localStorage.getItem(key));
  //  if(retriveContacts){ setContact([ retriveContacts])}

  // },[])

  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(contacts));

  // },[contacts])
  
  return (
    <>
    
    <Router>

    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/userlogin" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    
    
    </Routes>
    </Router>
    </>
  );
}

export default App;
