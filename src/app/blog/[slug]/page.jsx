/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from "firebase/firestore";
import { auth, currentUser, db } from '../../../../firebase.config';
import Nav from '@/app/components/Nav';

import { useAppSelector } from '@/store/store';
import Tools from './Tools';


const page = ({ params }) => {
    const [docRef, setDocRef] = useState();
    const [name, setName] = useState('');
    const [blog, setBlog] = useState('');
    const [date, setDate] = useState('');
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    const authState = useAppSelector((state) => state.auth.authState);

    useEffect(() => {
        const func = async () => {
            let LocalDocRef = doc(db, "blogs", params.slug)
            const docData = await getDoc(LocalDocRef)
            let lblog = docData.data()
            // lblog = lblog.blog.replaceAll(`\n`, "<br>")
            // console.log(lblog.blog.replace(new RegExp('\r?\n','g'), '<br />'))
            setDocRef(LocalDocRef);
            setName(lblog.Name);
            setBlog(lblog.blog);
            setDate(lblog.data);
            setLikes(lblog.likes);
            setDislikes(lblog.dislikes);
            // let str = blog.replace(/(?:\r\n|\r|\n)/g, "<br>");
            // document.getElementById("blog").innerHTML = blog.split("\\n").join("<br/>")
        }
        func();
    }, [authState, blog, params.slug])
    return (
        <>
            <Nav />
            <div className='lg:w-[60%] md: w-[80%] sm:w-full m-auto p-4 pb-0 min-h-[99vh] flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold pb-4'>{name}</h1>
                <div id='blog' className='m-auto'>
                    <pre>{blog}</pre>
                    <div className='min-h-[60px]'></div>
                </div>
                <Tools likes={likes} setLikes={setLikes} dislikes={dislikes} setDislikes={setDislikes} docRef={docRef} shareData={{ title: name, text: `${name}\n\n${blog.split("\\n").join("\n")}` }} />
            </div>
        </>
    )
}

export default page