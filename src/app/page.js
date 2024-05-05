'use client'
import Nav from "./components/Nav";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase.config'
import Link from "next/link";
import { useEffect, useState } from "react";
import ReduxProvider from "@/store/redux-provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import signUp from "./auth/signUp/page"

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(false)
  useEffect(() => {
    const func = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      setBlogs(querySnapshot.docs);
    }
    func();
  }, [])
  return (
    <>
      <Nav />
      <div>
        {
          blogs.map((doc) => {
            let data = doc.data();
            // doc.data() is never undefined for query doc snapshots
            return (
              <Link key={data.id} href={`/blog/${doc.id}`}>
                <div className="p-4 m-4 border rounded cursor-pointer" >
                  <h2>{data.Name}</h2>
                </div>
              </Link>
            );
          })
        }
      </div>
      <ToastContainer/>
    </>
  );
}
