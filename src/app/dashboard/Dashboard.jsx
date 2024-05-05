import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import SideBar from './SideBar'
import Nav from '../components/Nav'
import Analytics from './Analytics'
import AddBlog from './AddBlog'
import Comments from './Comments'

const Dashboard = () => {
  const [page, setPage] = useState('home')
  let [sideBarOppend,setSideBarOppend] = useState(false)

  return (
    <>
      <Nav />
      <div className='flex'>
        <SideBar sideBarOppend={sideBarOppend} setSideBarOppend={setSideBarOppend} setPage={setPage} />
        <div className={`w-full duration-500 p-4 h-full ${sideBarOppend ? 'ml-[40vw] md:ml-[250px]' : 'ml-[50px] md:ml-[60px]'}`}>
          {page == 'home' ? <Analytics /> : page =='add' ? <AddBlog /> : <Comments /> }
        </div>
      </div>
    </>
  )
}


export default Dashboard