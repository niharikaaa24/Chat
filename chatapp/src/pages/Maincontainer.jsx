import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function Maincontainer() {

  return (
    <div className='sm:flex items-center justify-center h-svh w-full bg-stone-50 md:p-5 sm'>
      <div className='hidden sm:flex sm:w-[95%] lg:w-[90%] bg-white sm:h-[95%] lg:h-[90%] rounded-xl justify-center '>
        <Sidebar />
        <Outlet />
      </div>
      <div className='block sm:hidden bg-white sm:h-[95%] lg:h-[90%] rounded-xl justify-center '>
        <Sidebar/>
      </div>
      
    </div>
  )
}

export default Maincontainer