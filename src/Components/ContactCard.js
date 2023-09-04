import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux';

const ContactCard = (props) => {
    const { setOpen, setEditData, editData, img } = props;
    const dispatch = useDispatch();
    const list = props.contact

    const handleDelete = (id) => {
        // console.log(id);

        dispatch(actionCreators.deleteContact(id));
    }

    const handleEdit = (data) => {
        // console.log(data);
        setOpen(true);
        setEditData(
            {
                ...editData,
                id: data._id,
                eName: data.name,
                eEmail: data.email,
                etag: data.tag
            });

        // console.log(data);
        // console.log(editData, "Editable Data");
    }

    return (
        <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 mb-10">

            <div className="flex flex-col items-center pb-6 pt-1">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={img} alt='profile' />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{list.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{list.email}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button onClick={() => handleEdit(list)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" onClick={() => handleDelete(list._id)}>Delete</button>
                </div>
            </div>
        </div>


        // <div className='border-2' key={list.id}>
        //     <img className="rounded-full w-8" src={list.image} alt='user'></img>
        //     <div className='content'>
        //         <div className='header'>{list.name}</div>
        //         <div className=''>{list.email}</div>
        //     </div>

        //     <i className='trash alternate outline icon' style={{color:"red", marginTop:"7px"}}></i>
        // </div>

    )
}

export default ContactCard