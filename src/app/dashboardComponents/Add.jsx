import React, { useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore';

import { IoClose } from "react-icons/io5";
import { db } from '../../../firebase.config';

const Add = ({setAdd, toast}) => {
    const [name, setName] = useState('')
    const [blog, setBlog] = useState('')

    const update = async() => {
        await addDoc(collection(db, 'blogs'), {
            Name: name,
            blog: blog,
            coments: [],
            dislikes: [],
            likes: []
        })
        toast("Blog Added successfully!")
    }
    return (
        <div className='absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10'>
            <div className='rounded-md w-[90%] max-w-[500px] bg-white m-auto p-4 flex flex-col items-center justify-center shadow-md mt-[50vh] -translate-y-[50%]'>
                <h2 className='text-2xl font-bold'>Add Blog</h2>
                <div className='w-full'>
                    <label htmlFor="name">Title:</label>
                    <input type="text" name="name" className='text-xl w-full my-2' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="blog">Blog:</label>
                    <textarea name="blog" cols="30" className='w-full' rows="10" value={blog} onChange={(e) => setBlog(e.target.value)}></textarea>
                    <div className='w-full flex justify-evenly'>
                        <button className='bg-red-500 px-4 py-2 rounded text-white' onClick={() => setAdd(false)}>Close</button>
                        <button className='bg-cyan-500 px-4 py-2 rounded text-white' onClick={update}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add