'use client'
import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase.config'
import { useEffect, useState } from "react";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Edit from '../dashboardComponents/Edit';
import Add from '../dashboardComponents/Add';
import Delete from '../dashboardComponents/Delete';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)
  const [removeDoc, setRemoveDoc] = useState(false)
  useEffect(() => {
    const func = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      setBlogs(querySnapshot.docs);
    }
    func();
  }, [])

  return (
    <div>
      <div className='flex justify-between duration-100'>
        <h1 className='font-bold text-xl'>Add Blog</h1>
        <div className='rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white duration-100 text-3xl' onClick={()=>setAdd(true)}>
          <IoMdAdd />
        </div>
      </div>
      <div>
      {
          blogs.map((doc) => {
            let data = doc.data();
            // doc.data() is never undefined for query doc snapshots
            return (
                <div key={data.Name} className="p-4 m-4 border rounded cursor-pointer flex justify-between" >
                  <h2>{data.Name}</h2>
                  <div className='flex text-xl justify-between'>
                    <MdModeEditOutline onClick={()=>setEdit(doc)} className='mr-2 text-cyan-400' />
                    <MdDelete onClick={()=> setRemoveDoc(doc)} className='text-red-500' />
                  </div>
                </div>
            );
          })
        }
      </div>
      <div className='z-50'>
        {edit && <Edit edit={edit} setEdit={setEdit} toast={toast} />}
        {add && <Add setAdd={setAdd} toast={toast} />}
        {removeDoc && <Delete removeDoc={removeDoc} setRemoveDoc={setRemoveDoc} toast={toast} /> }
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddBlog