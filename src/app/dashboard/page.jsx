"use client"
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import Notfound from '../not-found'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import Nav from '../components/Nav'
import Dashboard from './Dashboard'

const Page = () => {
    const [adminData, setAdminData] = useState({})
    const authState = useAppSelector((state) => state.auth.authState);
    const userUid = useAppSelector((state) => state.auth.uid);

    useEffect(()=> {
        const func = async() => {
            const docData = await getDoc(doc(db, "admins", "admins"))
            setAdminData(docData.data())
        }
        func()

    },[adminData, authState, userUid])

  return (
    authState && adminData && (`${userUid}` in adminData) ? <Dashboard/> : <Notfound/>
  )
}

export default Page