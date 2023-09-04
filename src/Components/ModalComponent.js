import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ModalComponent({ open, setOpen, setEditData, editData }) {

    const dispatch = useDispatch();


    const cancelButtonRef = useRef(null);

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    const handleDataSubmit = (e) => {
        e.preventDefault();
        // console.log("Submitted");
        if (editData.eName !== '' && editData.eEmail !== '') {
            dispatch(actionCreators.updateContact(editData.id, editData.eName, editData.eEmail, editData.eTag));
        }
        setEditData({
            id: '',
            eName: '',
            eEmail: '',
            eTag: 'default'
        })

        setOpen(false);

    }




    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                <div className='border border-spacing-2 p-10 grid justify-center'>
                                    <h2 className='bg-slate-300 text-center p-2 text-lg font-medium border border-1 border-red-600'>Add Contact</h2>
                                    <form onSubmit={handleDataSubmit}>
                                        <div className='grid grid-cols-1 pt-4 '>
                                            <label className='text-md font-medium'>Name</label>
                                            <input type="text" name='eName' placeholder='Name' value={editData.eName} onChange={handleEditChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
                                        </div>
                                        <div className='grid grid-cols-1 pt-4'>
                                            <label className='text-md font-medium'>Email</label>
                                            <input type="email" name='eEmail' placeholder='Email' value={editData.eEmail} onChange={handleEditChange} className='border border-1 border-slate-800 w-80 h-10 mt-2 pl-1' />
                                        </div>

                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}