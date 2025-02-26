import { useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../assets/Logo.png'
import { toast } from "react-toastify";
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Spinner from "./Spinner";
import { useSelector, useDispatch } from 'react-redux'
import { setId,setImage } from '../Slices/Data'



function Login() {
  const dispatch = useDispatch()
  const[loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const[name,setName] = useState("");
  const[password,setPassword] = useState("")
  


  async function Login(){
    if(!name || !password){
      return toast.error("Please Fill All The Details Completely")
    }
    setLoader(true)
    try{
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/login",{name,password})
      .then((res)=>{
      console.log(res.data)
      if(res.data.email!==undefined){
        Cookies.set('token',res.data.token)
      ,localStorage.setItem("id",res.data._id)
      ,localStorage.setItem("image",res.data.imageUrl)
      setLoader(false)
      navigate("/app/welcome")
      toast.success("Logged In Successfully")
      }
      else{
        setLoader(false)
        toast.error("Please Enter Valid Username or Password")
      }
      })
    }
    catch(err){
      console.log(err);
    }
  } 
  return (
    <div className='w-[90%] h-[90%] bg-white flex flex-col sm:flex-row rounded-xl'>
      <div className='hidden w-[30%] sm:block bg-gray-200 h-[100%]  justify-center items-center'>
        <img src={Logo} alt=""/>
      </div>
      <div className=' w-[100%] sm:w-[70%] flex flex-col justify-center items-center h-screen '>
        <img src={Logo} alt="" className='sm:hidden w-48 mb-[10%]'/>
        <p className='w-full text-center font-bold text-xl md:text-2xl'>Login to your Account</p>
        <br/>
        <input type="text" placeholder='Enter Your Username' value={name} onChange={(e)=>setName(e.target.value)} className='px-[2%] outline-none py-[1%] border-2 rounded-md'/>
        <br/>
        <input type="password" placeholder='Enter Your Password'  onChange={(e)=>setPassword(e.target.value)} className='px-[2%] outline-none py-[1%] border-2 rounded-md'/>
        <div className='w-full flex items-center justify-center my-[5%] sm:my-[2%] ' onClick={Login}>
        <button  className='bg-black rounded-md text-white py-[1%] px-[5%]'>Login</button> 
        </div>   
        <div className='flex gap-2'>
        <p className='text-gray-500'>Dont' have an Account yet?</p>
        <Link to="/signup" className='font-bold'>Sign Up</Link> 
        </div>  
        <div className="my-[2%]">
        {
          loader?(
            <Spinner/>
          ):(
            <div className="h-16">

            </div>
          )
        }
        </div>
      </div>
      
    </div>
  )
}

export default Login
