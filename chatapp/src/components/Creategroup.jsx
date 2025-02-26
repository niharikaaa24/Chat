import React, { useState , useEffect} from 'react'
import Default from '../assets/default.png'
import axios from 'axios'
import Phonenavbar from './Phonenavbar'
import Cookies from 'js-cookie'

function Creategroup() {
  const[groupName,setGroupName] = useState("")
  const[file,setFile] = useState(null)
  const[users,setUsers] = useState([])
  const[findUsers,setFindUsers]= useState("")
  const[user,setData] = useState([])
  
  useEffect(()=>{
  axios.post("https://chatapp-backend-hj9n.onrender.com/user/finduser",{token:Cookies.get("token"),name:findUsers})
  .then((res)=>setData(res.data))
  },[findUsers])

  function createGroup(){
    
    try{
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/creategroup",{
      token:Cookies.get("token"),
      users:users,
      name:groupName,
      file:file
    })
    .then((res)=>console.log(res.data))
    setUsers([])
    }
    catch(err){
      console.log(err)
    }
  }
  function Adduser(id){
   if(users.includes(id)){
    console.log(id)
    alert("user already addes")
    console.log(users)
   }
   else{
    setUsers([...users,id])
    console.log(users)
   }
  }
  
  return (
    <>
    <div className='hidden sm:flex flex-col lg:w-[70%] sm:w-[60%] h-[100%] m-[1%]'>
    <div className='w-[100%] h-[20%] flex flex-col gap-3 justify-end items-center'>
      <input placeholder='Enter Group Name' className='p-[1%] rounded-xl w-[60%]' value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
      <input placeholder='Search Users'className='p-[1%] rounded-xl w-[60%]' value={findUsers} onChange={(e)=>setFindUsers(e.target.value)}/>
      {/* <input type='file' className='border-2' onChange={(e)=>setFile(e.target.files[0])} /> */}
  
    </div>
    <div className='flex flex-col  gap-4 m-[1%] px-[10%] overflow-y-auto h-[68%]'>
      {
        user.length>0?(
          user.map((users)=>{
            if(users._id!==localStorage.getItem('id')){
              return <div className='cursor-pointer flex items-center gap-2 my-[2%] text-xl bg-white rounded-xl w-full ' onClick={()=>Adduser(users._id)}>
              <div className='w-[30%]'>
                {
                  users.imageUrl!==null?(
                    <img src={users.imageUrl} className='h-16 mx-auto object-cover rounded-full w-16' alt=""/>
                  ):(
                    <img src={Default} className='h-16 mx-auto object-cover rounded-full w-16' alt=""/>
                  )
                }
              </div>  
              <div className='w-[70%]'>{users.name}</div>
          </div>
            }
            
          })
        ):(
          <div>
            No user found
          </div>
        )
      } 
    </div>
    <div className='h-[12%] flex items-center justify-center'>
    <button onClick={createGroup} className='bg-black text-white m-[3%] py-[1%] px-[2%] rounded-xl'>Create Group</button>
    </div>
    </div>
    <div className='block sm:hidden w-screen h-screen'>
      <div className='h-[15%] flex justify-center items-center py-[2%] px-[2%] '><Phonenavbar/></div>
      <div className=' flex flex-col w-[100%] h-[75%] p-[2%]'>
      <div className='w-[100%] h-[30%] flex flex-col gap-3 justify-center items-center '>
      <input placeholder='Enter Group Name' className='p-[2%] rounded-2xl w-[80%]' value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
      <input placeholder='Search Users'className='p-[2%] rounded-2xl w-[60%] w-[80%]' value={findUsers} onChange={(e)=>setFindUsers(e.target.value)}/>
      </div>
      <div className='flex flex-col gap-7 overflow-y-scroll '>
      {
        user.length>0?(
          user.map((users)=>(
            <div className='flex items-center gap-2 my-[2%] text-xl bg-white rounded-xl' onClick={()=>Adduser(user._id)}>
                <div className='w-[30%]'><img src={users.imageUrl} className='h-16 mx-auto object-cover rounded-full w-16' alt=""/></div>  
                <div className='w-[70%]'>{users.name}</div>
                </div>
          ))
        ):(
          <div>
            No user found
          </div>
        )
      } 
    </div>
    </div>
    <div className='flex justify-center h-[10%]'>
    <button className='bg-black text-white m-[3%] px-[2%] rounded-xl' onClick={createGroup}>Create Group</button>
    </div>
    </div>
    </>
  )
}

export default Creategroup
