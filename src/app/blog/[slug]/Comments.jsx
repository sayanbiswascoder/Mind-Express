import { DocumentReference, Timestamp, addDoc, collection, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store';
import { db } from '../../../../firebase.config';

import { IoSend } from "react-icons/io5";

const Comments = ({ docRef, visebility }) => {
    const authState = useAppSelector((state) => state.auth.authState);
    const userName = useAppSelector((state) => state.auth.name);
    const avatar = useAppSelector((state) => state.auth.avatar);
    const [coments, setComents] = useState([])
    const [commentsRef, setCommentsRef] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {
        const func = async () => {
            if (docRef) {
                if (visebility) {
                    if (coments.length === 0) {
                        let docSnap = await getDoc(docRef);
                        let docData = docSnap.data().coments
                        setCommentsRef(docData)
                        let comentsArr = []
                        for (let i = 0; i < docData.length; i++) {
                            let doc = (await getDoc(docData[i]))
                            comentsArr.push(doc.data())
                        }
                        setComents(comentsArr)
                        console.log(comentsArr[0].date.seconds)
                    }
                }
            }
        }
        func()
    }, [coments, coments.length, docRef, visebility])

    const pushComment = async () => {
        const colec = collection(db, "coments")
        const data = {
            by: authState ? userName : "anonymous",
            comment: comment,
            date: Timestamp.fromDate(new Date()),
            displayPicture: authState ? avatar : "/next.svg",
            on: docRef
        }
        const commentRef = await addDoc(colec, data)
        await updateDoc(docRef,{
            coments: [...commentsRef, commentRef]
        })
        setCommentsRef([...commentsRef, commentRef])
        setComents([...coments, data])
    }
    return (
        <div style={{ display: visebility ? 'flex' : 'none' }} className='flex-col w-full p-6 overflow-y-auto scroll max-h-[50%]'>
            <div className='flex h-[50px]' >
                <textarea name="comentBox" id="" cols="30" rows="10" value={comment} onChange={e => setComment(e.target.value)} className='resize-none w-[80%] h-full bg-cyan-200 outline-none p-2 rounded-l-md'></textarea>
                <div className='w-[20%] h-full flex flex-col justify-center'>
                    <button onClick={pushComment} className={`bg-cyan-500 ${authState ? 'h-full rounded-r-md' : 'h-[50%] rounded-tr-md'}`}>{authState ? "Comment" : "Anounomus"}</button>
                    {!authState && <button className='bg-green-500 h-[50%] rounded-br-md'>Login</button>}
                </div>
            </div>
            {
                coments.map((elm, ind) => <div className='mb-4 flex' key={ind}>
                    <div className='w-[10%] flex items-start mt-2 mr-2 justify-end rounded'>
                        <img src={elm.displayPicture} className='rounded-full w-[30px] h-[30px]' alt="displayPicture" />
                    </div>
                    <div>
                        <div className=''>
                            <h2><b>{elm.by}</b></h2>
                            <span className='fo text-sm'>{new Date(elm.date.seconds).toDateString()}</span>
                        </div>
                        <div>
                            {elm.comment}
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Comments