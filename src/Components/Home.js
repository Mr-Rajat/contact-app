import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../redux';

import AddContact from './AddContact';
import ContactList from './ContactList';
import Header from './Header';

const Home = () => {

  const dispatch = useDispatch();
  const [contacts, setContacts] = useState({name:"", email:""});
  const useContacts = useSelector(state => state.userData.userContacts);
  // console.log(useContacts)


  // if(useContacts.length!==0){
  //   setContacts(useContacts);
  //   // console.log(contacts)
  // }
  // setContacts(useContacts);

  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken1');
    if (authToken) {
      // console.log(authToken)
      // navigate('/')
      dispatch(actionCreators.fetchData(authToken)) 
      
    }
    
  }, [])

  useEffect(() => {
    console.log(contacts)
    if(contacts.name.length!==0 && contacts.email.length !==0 ){
      dispatch(actionCreators.addData(contacts));
      setContacts({name:"", email:""});

      const authToken = localStorage.getItem('authToken1');
      if (authToken) {
        dispatch(actionCreators.fetchData(authToken)) 
        
      }
    }
  }, [contacts]);
  
  const addContactHandler = async(contact) => {
    console.log(contact);
    setContacts({name: contact.name, email: contact.email});
    
    
    // console.log(contacts)
    
  }
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Rajat",
  //     email: "rajat@gmail.com",
  //     image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
  //   },
  //   {
  //     id: "2",
  //     name: "Neeraj",
  //     email: "neeraj@gmail.com",
  //     image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
  //   },
  //   {
  //     id: "3",
  //     name: "Shiv",
  //     email: "shiv@gmail.com",
  //     image: "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg"
  //   }
  // ]
  return (
    <div className='container mx-auto'>

      {localStorage.getItem('authToken1') ?
        <div>
          <Header />
          <AddContact addContactHandler={addContactHandler} />
          <ContactList contacts={useContacts} />
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