import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from '@/store/store';
import { db } from '../../../../firebase.config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa6";
import Comments from './Comments';

const Tools = ({ likes, setLikes, dislikes, setDislikes, docRef, shareData }) => {
    const [commentBoxVisseble, setCommentBoxVisseble] = useState(false)
    const authState = useAppSelector((state) => state.auth.authState);
    const userUid = useAppSelector((state) => state.auth.uid);

    const like = async (uid) => {
        if (authState) {
            if (!likes.includes(`${uid}`)) {
                let Llikes = [...likes, uid]
                let Ldislikes = dislikes
                Ldislikes.splice(Ldislikes.indexOf(uid), 1)
                await updateDoc(docRef, {
                    likes: Llikes,
                    dislikes: Ldislikes.splice(Ldislikes.indexOf(uid), 1)
                });
                setLikes([...likes, uid])
                setDislikes(Ldislikes.splice(Ldislikes.indexOf(uid), 1))
            } else {
                let Llikes = likes
                Llikes.splice(Llikes.indexOf(uid), 1)
                await updateDoc(docRef, {
                    likes: Llikes,
                });
                setLikes(Llikes)
            }
        } else {
            toast.error("Login First")
        }
    }
    const dislike = async (uid) => {
        if(authState){
            if (authState && !dislikes.includes(`${uid}`)) {
                let Llikes = likes
                let Ldislikes = [...dislikes, uid]
                Llikes.splice(Llikes.indexOf(uid), 1)
                await updateDoc(docRef, {
                    likes: Llikes.splice(Llikes.indexOf(uid), 1),
                    dislikes: Ldislikes,
                });
                setLikes(Llikes.splice(Llikes.indexOf(uid), 1))
                setDislikes(Ldislikes)
            }else{
                let Ldislikes = dislikes
                Ldislikes.splice(Ldislikes.indexOf(uid), 1)
                await updateDoc(docRef, {
                    dislikes: Ldislikes,
                });
                setDislikes(Ldislikes)
            }
        }else{
            toast.error("Login First")
        }
    }

    const share = () => {
        if(navigator.share){
            navigator.share(shareData)
        }
    }
    return (
        <div className=' min-w-[200px] lg:w-[60%] w-[90%] h-auto fixed overflow-y-scroll bottom-0 bg-cyan-300 text-white rounded-t-md border max-h-[60vh]'>
        <div className='flex text-4xl w-full sticky top-0 bg-cyan-300 py-2'>
            <div className="w-[25%] flex justify-center" onClick={() => like(userUid)}>{authState && likes.includes(`${userUid}`) ? <BiSolidLike /> : <BiLike />}</div>
            <div className="w-[25%] flex justify-center" onClick={() => dislike(userUid)}>{authState && dislikes.includes(`${userUid}`) ? <BiSolidDislike /> : <BiDislike />}</div>
            <div className="w-[25%] flex justify-center" onClick={()=>setCommentBoxVisseble(!commentBoxVisseble)}><FaRegComment/></div>
            <div className="w-[25%] flex justify-center" onClick={share}><RiShareForwardLine/></div>
        </div>
        <div className='ov overflow-y-scroll'>
            <Comments docRef={docRef} visebility={commentBoxVisseble}/>
        </div>
        <ToastContainer/>
        </div>
    )
}

export default Tools