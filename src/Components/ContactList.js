import React from 'react'
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const contact = props.contacts;
    return (
        <div className='grid grid-cols-3 justify-items-center py-4
        '>
            {contact.map((list) => (
                <ContactCard contact={list}/>

                // <div key={list.id} className='item'>
                //     <div className='content'>
                //         <div className='header'>{list.name}</div> 
                //         <div className=''>{list.email}</div>
                //     </div>
                //     <i className='trash alternate outline icon'></i>
                // </div>
            )
            )}

        </div>
    )
}

export default ContactList