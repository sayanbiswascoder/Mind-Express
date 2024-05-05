import React from 'react'
import Link from 'next/link'

import {IoIosArrowForward} from 'react-icons/io'
import { IoIosAddCircle } from "react-icons/io";
import {DiGoogleAnalytics} from 'react-icons/di'
import {AiFillSetting,AiFillMessage} from 'react-icons/ai'
import {FaShoppingCart,FaClipboardList,FaUserCircle} from 'react-icons/fa'
import {HiUsers} from 'react-icons/hi'

const SideBar = ({sideBarOppend,setSideBarOppend, setPage}) => {
    return (
        <>
        {/* <div className='h-[100vh] w-[40px]'></div> */}
        <div
          className={`${sideBarOppend ? 'w-[40vw] md:w-[250px]' : 'w-[50px] md:w-[60px]'} bg-cyan-600 fixed text-color-font h-[100vh] pt-4 px-[5px] md:px-[10px] duration-500  mt-0 top-12 text-white z-0'`}
          >
            <div className={`absolute duration-500 border-8 border-transparent border-t-color-second -rotate-45 rounded-full top-0 w-6 h-6 ${sideBarOppend ? 'left-[40vw] md:left-[250px]' : 'left-[50px] md:left-[60px]'} translate-y-[10%] translate-x-[-30%]`}>
            </div>
            <div
              className={`w-4 h-4 rounded-full shadow-md absolute bg-cyan-600 ${sideBarOppend ? 'left-[40vw] md:left-[250px] -rotate-180' : 'left-[50px] md:left-[60px]'}  translate-x-[-50%] top-4 duration-500 cursor-pointer`}
              onClick={() =>{setSideBarOppend(!sideBarOppend)}}
            >
                <IoIosArrowForward/>
            </div>
            
            <div>
              <div onClick={()=>setPage('home')} className={`w-full h-[40px] rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-white text-white hover:text-black duration-300 cursor-pointer`}>
                <DiGoogleAnalytics className='translate-x-[-50%] absolute duration-300'/>
                <h3 className='ml-5 duration-500'>Analytics</h3>
              </div>

              <div onClick={()=>setPage('add')} className={`w-full h-[40px] rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-white text-white hover:text-black duration-300 cursor-pointer`}>
                <IoIosAddCircle className='translate-x-[-50%] absolute duration-300'/>
                <h3 className='ml-5 duration-500'>Add Blog</h3>
              </div>
    
              {/* <Link href={'/dashboard/settings'} className={`w-full h-[40px] hover:bg-color-primary backdrop-blur-3xl rounded-full my-2 flex items-center text-xl pl-[20px] overflow-hidden duration-500`}>
                <AiFillSetting className='translate-x-[-50%] duration-500 absolute'/>
                <h3 className='ml-5 duration-500'>Settings</h3>
              </Link> */}
    
              <div onClick={()=>setPage('account')} className={`w-full h-[40px] rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-white text-white hover:text-black duration-300 cursor-pointer`}>
                <FaUserCircle className='translate-x-[-50%] duration-300 absolute'/>
                <h3 className='ml-5 duration-500'>Account</h3>
              </div>
            </div>
        </div>
        </>
      )
}

export default SideBar