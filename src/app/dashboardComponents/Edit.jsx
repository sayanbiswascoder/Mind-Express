import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { IoClose } from "react-icons/io5";
import { db } from '../../../firebase.config';

const Edit = ({ edit, setEdit, toast }) => {
    const [name, setName] = useState('')
    const [blog, setBlog] = useState('')
    useEffect(() => {
        const func = async () => {
            const doc = await getDoc(edit.ref)
            const data = doc.data();
            setName(data.Name)
            setBlog(data.blog)
        }
        func()
    }, [edit])

    const update = async() => {
        await updateDoc(edit.ref, {
            Name: name,
            blog: blog
        })
        toast("Blog edited successfully!")
    }
    return (
        <div className='absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10'>
            <div className='rounded-md w-[90%] max-w-[500px] bg-white m-auto p-4 flex flex-col items-center justify-center shadow-md mt-[50vh] -translate-y-[50%]'>
                <h2 className='text-2xl font-bold'>Edit Blog</h2>
                <div className='w-full'>
                    <label htmlFor="name">Title:</label>
                    <input type="text" name="name" className='text-xl w-full my-2' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="blog">Blog:</label>
                    <textarea name="blog" cols="30" className='w-full' rows="10" value={blog} onChange={(e) => setBlog(e.target.value)}></textarea>
                    <div className='w-full flex justify-evenly'>
                        <button className='bg-red-500 px-4 py-2 rounded text-white' onClick={() => setEdit(false)}>Close</button>
                        <button className='bg-cyan-500 px-4 py-2 rounded text-white' onClick={update}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit