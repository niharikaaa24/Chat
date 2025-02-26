import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Default from '../assets/default.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BASE_URL } from '../data';
import socket from "../components/Socket";


function Online() {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [findUsers, setFindUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  
  

  const getUsers = async()=>{
    try {
      const {data} = await axios.post(`${BASE_URL}/user/getall`, {
      },{withCredentials:true})
      setUsers(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUsers()
  }, []);


  const CreateChat = async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/accesschats`, {
        userId: userId,
      },{withCredentials:true});
      toast.success("User Added Successfully");
      setData(response.data);
      
      socket.emit('newuser');  
      
      const currentUserId = id;
      const otherUser = response.data.users.find(user => user._id !== currentUserId);
      if (otherUser) {
       
          navigate(`/app/chat/${response.data._id}`);
        
      } else {
        console.error("Other user not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <>
      <div className='hidden sm:block sm:w-[60%] lg:w-[70%] h-full m-[1%]'>
        <div className='md:h-[30%] sm:h-[20%] '>
          <div className='flex '>
            <span className='w-[10%] p-[1%]'><img src={Logo} alt="" /></span>
            <p className='w-[90%] flex items-center text-2xl'>Add Users</p>
          </div>
          <div className='bg-white flex items-center px-[1%] py-[1%] m-[3%] rounded-3xl'>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input type='text' placeholder='Search Any User'
              className='b-none text-bg ml-[1%] p-[1%] w-full outline-none'
              value={findUsers} onChange={(e) => setFindUsers(e.target.value)}
            />
          </div>
        </div>
        <div className='sm:h-[70%] md:h-[65%] overflow-y-scroll px-[10%] '>
          {
            users.map((user) => (
              <div key={user._id} className='cursor-pointer flex items-center gap-2 my-[2%] text-xl bg-gray-100 border-2 shadow-lg rounded-xl' onClick={() => CreateChat(user._id)}>
                <div className='w-[20%]'>
                  {user.imageUrl ? (
                    <img src={user.imageUrl} className='h-16 mx-auto p-1 rounded-full w-16' alt="" />
                  ) : (
                    <img src={Default} className='h-16 mx-auto object-cover rounded-full w-16' alt="" />
                  )}
                </div>
                <div className='w-[70%]'>{user.name}</div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Phone view */}
      <div className='w-screen block sm:hidden h-screen'>
        <div className='h-[30%]'>
          <div className='flex '>
            <span className='w-[50%] p-[1%]'><img src={Logo} alt="" className='w-24 h-24' /></span>
            <p className='w-[50%] flex items-center text-2xl text-start'>Add Users</p>
          </div>
          <div className='bg-white flex items-center px-[1%] py-[1%] m-[3%] rounded-3xl'>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input type='text' placeholder='search'
              className='b-none text-bg ml-[1%] p-[1%] w-full outline-none'
              value={findUsers} onChange={(e) => setFindUsers(e.target.value)}
            />
          </div>
        </div>
        <div className='h-[70%] flex flex-col gap-4 items-center py-[2%] overflow-y-scroll'>
          {
            users.map((user) => (
              <div key={user._id} className='flex h-[20%] w-[93%] items-center bg-white rounded-xl' onClick={() => CreateChat(user._id)}>
                <div className='w-[20%]'>
                  {user.imageUrl ? (
                    <img src={user.imageUrl} className='md:h-16 w-12 h-12 rounded-full md:w-16' alt="" />
                  ) : (
                    <img src={Default} className='md:h-16 w-12 h-12 rounded-full md:w-16' alt="" />
                  )}
                </div>
                <div className='w-[80%] text-xl font-semibold text-center'>{user.name}</div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Online;