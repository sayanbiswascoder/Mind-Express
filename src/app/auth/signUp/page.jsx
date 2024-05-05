/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import { auth } from '../../../../firebase.config';
import GoogleButton from 'react-google-button'
import { setPersistence, signInWithRedirect, inMemoryPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, updateProfile } from "firebase/auth";
import { useAppDispatch } from '@/store/store';
import { setAuthState, setAuthName, setAuthUid, setAuthAvatar } from '@/store/authSlice';
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const dispatch = useAppDispatch()
    const signUpWithGoogle = () => {
        setPersistence(auth, inMemoryPersistence)
            .then(() => {
                const provider = new GoogleAuthProvider();
                // In memory persistence will be applied to the signed in Google user
                // even though the persistence was set to 'none' and a page redirect
                // occurred.
                return signInWithRedirect(auth, provider);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
            router.push('/')
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            dispatch(setAuthState(true))
            dispatch(setAuthUid(user.uid))
            dispatch(setAuthName(user.displayName))
            dispatch(setAuthAvatar(user.photoURL))
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    const signUpWithPassword = () => {
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        // Email verification sent!
                        updateProfile(auth.currentUser, {
                            displayName: name, photoURL: "/vercel.svg"
                          }).then(() => {
                            // Profile updated!
                            // ...
                            router.push('/')
                          }).catch((error) => {
                            // An error occurred
                            // ...
                          });
                        // ...
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <>
            <Nav />
            <div className='w-auto flex flex-col py-4 items-center'>
                <input type="text" className='w-[240px] h-[50px] outline-none border border-black' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" className='w-[240px] h-[50px] outline-none border border-black mt-4' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className='w-[240px] h-[50px] outline-none border border-black mt-4' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className='w-[240px] h-[50px] bg-cyan-400 my-4' onClick={signUpWithPassword}>Log In</button>
                <span>----------or----------</span>
                <GoogleButton
                    label='Sign Up With Google'
                    onClick={signUpWithGoogle}
                />
            <span className='mt-2'>Allredy have account <Link href={'/auth/signIn'}>LogIn</Link></span>
            </div>
            
        </>
    )
}

export default page