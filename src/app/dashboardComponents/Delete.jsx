import React, { useState, useEffect } from 'react'
import { deleteDoc, doc } from 'firebase/firestore';

import { IoClose } from "react-icons/io5";
import { db } from '../../../firebase.config';

const Delete = ({removeDoc, setRemoveDoc, toast}) => {

    const remove = async() => {
        await deleteDoc(removeDoc.ref)
        toast.warn("Blog delete successfully!")
    }
    return (
        <div className='absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10'>
            <div className='rounded-md w-[90%] max-w-[500px] bg-white m-auto p-4 flex flex-col items-center justify-center shadow-md mt-[50vh] -translate-y-[50%]'>
                <h2 className='text-2xl font-bold'>Delete Blog</h2>
                <div className='w-full'>
                    <h3 className='text-red-500'>Are you sure you want to delete this blog</h3>
                    <div className='w-full flex justify-evenly'>
                        <button className='bg-red-500 px-4 py-2 rounded text-white' onClick={() => setRemoveDoc(false)}>Close</button>
                        <button className='bg-cyan-500 px-4 py-2 rounded text-white' onClick={remove}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete