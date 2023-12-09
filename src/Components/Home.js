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

  // fetch contacts on first load
  useEffect(() => {
    const authToken = localStorage.getItem('authToken1');
    if (authToken) {
      dispatch(actionCreators.fetchData(authToken)) 
      
    }
    // eslint-disable-next-line
  },[])

  useEffect(() => {

    if(contacts.name.length!==0 && contacts.email.length !==0 ){
      console.log(contacts)
      let payload = new FormData();
      payload.append("name",contacts.name)
      payload.append("email",contacts.email)
      payload.append("image",contacts.image)
      dispatch(actionCreators.addData(payload));
      setContacts({name:"", email:""});
    }
    // eslint-disable-next-line
  }, [contacts]);
  
  const addContactHandler = async(contact) => {
    // console.log(contact);
    setContacts({name: contact.name, email: contact.email,image:contact.image});
    
  }
  
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

    </div>
  )
}

export default Home