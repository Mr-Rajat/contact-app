import React, { useEffect, useState } from 'react'
import ContactCard from './ContactCard';
import ModalComponent from './ModalComponent';

const ContactList = (props) => {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({eName:'', eEmail:''});
    const contact = props.contacts;

    return (
        <>

            <ModalComponent open={open} setOpen={setOpen} setEditData={setEditData} editData={editData}/>

            <div className='grid grid-cols-3 justify-items-center bg-blue-100 '>
                {contact.length === 0 && 'No Contacts to display'}
                {contact.map((list) => (

                    <ContactCard setOpen={setOpen} contact={list} key={list._id} setEditData={setEditData} editData={editData} />

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

        </>
    )
}

export default ContactList