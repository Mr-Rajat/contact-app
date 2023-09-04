import React, { useState } from 'react'
import ContactCard from './ContactCard';
import ModalComponent from './ModalComponent';

const ContactList = (props) => {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({ id: '', eName: '', eEmail: '', eTag: 'default' });
    const contact = props.contacts;
    const image = "https://www.neerajminhas.com/static/media/neeraj.24287aa3f6b4bbb0c0f8.jpg";

    // console.log(editData);

    return (
        <>

            <ModalComponent open={open} setOpen={setOpen} setEditData={setEditData} editData={editData} />

            <div className='grid grid-cols-3 justify-items-center bg-blue-100 '>
                {contact.length === 0 && 'No Contacts to display'}
                {contact.map((list) => (

                    <ContactCard img={image} setOpen={setOpen} contact={list} key={list._id} setEditData={setEditData} editData={editData} />

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