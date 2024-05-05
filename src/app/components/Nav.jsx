"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa6";
import "../globals.css"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/store/store";
import { onAuthStateChanged, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { auth, avatarStorageRef, db } from '../../../firebase.config';
import { getDoc, doc } from 'firebase/firestore'
import { useAppDispatch } from '@/store/store';
import { setAuthAvatar, setAuthName, setAuthState, setAuthUid } from '@/store/authSlice';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



import { MdSpaceDashboard } from "react-icons/md";

const Nav = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth.authState);
  const userName = useAppSelector((state) => state.auth.name);
  const avatar = useAppSelector((state) => state.auth.avatar);
  const [userUid, setUserUid] = useState('')

  const [userBoxState, setUserBoxState] = useState(false)
  const [userBoxClick, setUserBoxClick] = useState(false)

  const [adminData, setAdminData] = useState({})

  const router = useRouter();

  useEffect(() => {
    const func = async () => {
      const docData = await getDoc(doc(db, "admins", "admins"))
      setAdminData(docData.data())
    }
    func()

  }, [])

  // console.log(auth.currentUser.providerData[0].providerId)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      dispatch(setAuthState(true))
      dispatch(setAuthUid(user.uid))
      dispatch(setAuthName(user.displayName))
      dispatch(setAuthAvatar(user.photoURL))
      setUserUid(user.uid)

      // console.log(auth)

      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const chengeAvatar = async (e) => {
    const avatarRef = await ref(avatarStorageRef, `${auth.currentUser.uid}.jpg`)
    let file = e.target.files[0]
    // file = new File([file], `${auth.currentUser.uid}.jpg`, {
    //   name: `${auth.currentUser.uid}.jpg`,
    //   type: 'image/jpeg',
    //   lastModified: new Date()
    // })

    // file.name = `${auth.currentUser}.jpg`
    uploadBytes(avatarRef, file).then((snapshot) => {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      getDownloadURL(ref(avatarStorageRef, `${auth.currentUser.uid}.jpg`)).then(url => {
        updateProfile(auth.currentUser, {
          photoURL: url
        })
        router.refresh()
      })
    });

    console.log(avatarRef)
  }
  return (
    <nav className='w-full bg-cyan-600 py-2 flex justify-between sticky top-0'>
      <Link href={"/"}>
        <img src='/logo.svg' />
      </Link>
      <div className='flex'>
        {authState && adminData && (`${userUid}` in adminData) && <Link href={`/dashboard`}><div className='text-2xl rounded-full border mx-4 w-[35px] h-[35px] flex items-center justify-center'><MdSpaceDashboard /></div></Link>}

        <div className='text-2xl rounded-full border mx-4' onMouseEnter={() => setUserBoxState(true)} onMouseLeave={() => setUserBoxState(false)} onClick={() => setUserBoxClick(!userBoxClick)}>
          <img alt='avatar' src={avatar !== "" ? avatar : "/next.svg"} width={35} height={35} className='h-[35px] w-[35px] rounded-full' />
        </div>
        <div className='absolute transition-all duration-300 overflow-hiddn bg-white rounded shadow-md text-nowrap right-2 top-14 p-2 before:content-[""] before:h-4 before:w-4 before:bg-white before:absolute before:right-4 before:rotate-[135deg] before:top-[-8px] before:shadow-md' id='userBox' style={userBoxState || userBoxClick ? { height: "auto", width: "auto", visibility: "visible" } : { height: "0px", width: "0px", visibility: "hidden" }} onMouseEnter={() => setUserBoxState(true)} onMouseLeave={() => setUserBoxState(false)}>
          <div className='overflow-hidden cursor-default'>
            {
              authState ? (
                <>
                  <span>{userName}</span>
                  <br />
                  <hr />
                  {auth.currentUser.providerData[0].providerId !== "google.com" && (<><input onChange={(e) => chengeAvatar(e)} className="visible before:content-['Change Avatar'] chenge_avatar before:visible" type='file' /> <hr /></>)}
                  {auth.currentUser.providerData[0].providerId !== "google.com" && (<><span onClick={() => sendPasswordResetEmail(auth, auth.currentUser.email)}>Change Password</span> <hr /></>)}
                  <span className='cursor-pointer' onClick={() => { signOut(auth) }}>LogOut</span>
                </>
              ) : (
                <>
                  <span className='cursor-pointer' onClick={() => router.push("/auth/signUp")}>Sign Up</span>
                </>
              )
            }

          </div>
        </div>

      </div>
    </nav>
  )
}


export default Nav