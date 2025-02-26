import React, { useState ,useEffect } from 'react'
import Logo from '../assets/Logo.png'
// import Phonesidebar from './Phonesidebar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Welcome() {
  const navigate = useNavigate()

  const[isLogin,setIsLogin] = useState(false)
//   useEffect(()=>{
//    const token = Cookies.get('token')
//    if(token){
//     setIsLogin(true)
//    }
//    else{
//     setIsLogin(false)
//     navigate("/")
//    }
//   },[])
  return (
      <div className='sm:w-[60%] lg:w-[70%] m-[1%]'>
      <div className='hidden  gap-4 sm:flex flex-col justify-center items-center h-full w-full'>
      <img src={Logo} alt="" className='w-[50%] h-[45%]'/> 
      <p className='sm:text-base md:text-lg lg:text-xl text-gray-500'>View and text directly to peaple present in the chat rooms</p>
      </div>
      <div className='sm:hidden w-screen h-screen'>
       {/* <Phonesidebar/> */}
      </div>
    </div>
  )
}

export default Welcome