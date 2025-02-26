import React from 'react'
import Logo from '../assets/Logo.png'
import SearchIcon from '@mui/icons-material/Search'
import {IconButton} from '@mui/material'
function Online() {
  return (
    <div className='w-[70%]'>
      <div className='flex h-[10%]'>
      <img src={Logo} alt=""/>
      Online Users
      </div>
      <div className=' bg-white flex items-center px-[1%] py-[1%] m-[3%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
      </div>
    </div>
  )
}

export default Online
