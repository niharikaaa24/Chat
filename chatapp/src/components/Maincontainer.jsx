import React,{useState} from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Maincontainer() {
  const[conversation,setConversation] =useState(
    {
        name:"text1",
        lastMessage:"Last message #1",
        timeStamp:"today",
    },
    
)
  return (
    <>
    <div className='hidden sm:flex sm:w-[95%] lg:w-[90%] bg-stone-50 sm:h-[95%] lg:h-[90%] rounded-xl '>
    <Sidebar/>
    <Outlet/>
    </div>
    <div className='block sm:hidden w-screen'>
      <Outlet/>
    </div>
    
    </>
  )
}

export default Maincontainer
