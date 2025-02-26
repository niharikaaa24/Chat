import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Default from '../assets/default.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
let socket;

function Online() {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [findUsers, setFindUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    socket = io(ENDPOINT);  // Initialize socket.io connection when component mounts

    axios.post("https://chatapp-backend-hj9n.onrender.com/user/finduser", {
      token: Cookies.get("token"),
      name: findUsers,
    })
    .then((res) => setUsers(res.data));
  }, [findUsers]);

  useEffect(() => {
    try {
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/getall", {
        token: Cookies.get("token"),
      })
      .then((res) => setUsers(res.data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const CreateChat = async (userId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/accesschats", {
        userId: userId,
        token: token,
      });
      toast.success("User Added Successfully");
      setData(response.data);
      
      socket.emit('new user');  // Emit new user after adding successfully
      
      const currentUserId = id;
      const otherUser = response.data.users.find(user => user._id !== currentUserId);
      if (otherUser) {
        const { name, imageUrl } = otherUser;
        if (name && imageUrl) {
          navigate("/app/chat", { state: { id: response.data._id, name: name, length: 0, image: imageUrl } });
        } else {
          console.error("Required user data is missing");
        }
      } else {
        console.error("Other user not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const CreateChatPhone = async (userId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/accesschats", {
        userId: userId,
        token: token,
      });
      const currentUserId = id;
      const otherUser = response.data.users.find(user => user._id !== currentUserId);
      if (otherUser) {
        navigate("/chat", { state: { id: response.data._id, name: otherUser.name, length: 0, image: otherUser.imageUrl } });
      }
      
      socket.emit('new user');  // Emit new user after adding successfully

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
              <div key={user._id} className='flex h-[20%] w-[93%] items-center bg-white rounded-xl' onClick={() => CreateChatPhone(user._id)}>
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
