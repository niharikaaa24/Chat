import React, { useEffect , useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Messageself from './Messageself';
import Messageother from './Messageother';
import { useLocation } from 'react-router-dom';
import { FaRegImage } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from 'axios';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { IoSend } from "react-icons/io5";
import Cookies from 'js-cookie';
import Phonesidebar from './Phonesidebar'

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
let socket;

function Chatarea() {
  const senderId = localStorage.getItem('id');
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [content, setContent] = useState("");
  const location = useLocation();
  const endRef = useRef(null);

  const id = location.state.id;
  const name = location.state.name;
  const users = location.state.users;
  const length = location.state.length;
  const image = location.state.image;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Upload file to server/cloudinary
        const { data } = await axios.post('https://chatapp-backend-hj9n.onrender.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSelectedImage(data.url);
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", senderId);
    
    socket.on("connected", () => {
      console.log("Socket connected");
    });

    socket.emit("join chat", id); // Ensure user joins the correct chat room

    return () => {
      socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, [id, senderId]);

  const handleEmoji = (e) => {
    setContent((prev) => prev + e.emoji);
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage", {
        token: Cookies.get("token"),
        chat: id
      });
      setConversation(data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    fetchChats();

    // Handle message received event only once the chat is joined
    socket.on("message received", (newMessage) => {
      console.log("New message received", newMessage);
      // Add new message to the conversation without fetching all chats again
      fetchChats()
    });

    // Clean up the listener on unmount
    return () => {
      socket.off("message received");
    };
  }, [id]);

  const sendChat = async () => {
    try {
      const { data } = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage", {
        token: Cookies.get("token"),
        chatId: id,
        content: content,
        file: selectedImage // Using uploaded image URL
      });

      setFile(null);
      setSelectedImage(null);
      setContent("");
      socket.emit("new message", data, id); // Emit the new message to the server
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const sendChatByEnter = async (event) => {
    if (event.key === 'Enter') {
      await sendChat();
    }
  };

  return (
    <>
      <div className='relative hidden sm:block gap-5 flex-col lg:w-[70%] sm:w-[60%] justify-center items-center m-[1%]'>
        <div className='h-[10%] w-[100%] flex justify-between bg-white rounded-xl'>
          <div className='px-[3%] flex items-center'>
            <img
              alt="User"
              src={image}
              className="mx-auto rounded-full sm:w-12 sm:h-12 md:w-13 lg:w-14 lg:h-14"
            />
            <div>
              <p className='w-[90%] text-start p-[1%] lg:text-2xl md:text-2xl sm:text-xl ml-2 font-bold'>{name}</p>
              <div className='flex gap-1 ml-2'>
                {length > 0 ? (
                  users.map((user) => (
                    <div key={user._id}>
                      {user.name},
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div> 
          <div className='w-[10%] flex justify-center'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <div className='h-[80%] w-[100%] bg-white rounded-xl p-[2%] overflow-y-scroll overflow-x-hidden'>
          {conversation.map((message, index) => {
            const sender = message.sender;
            return sender && sender._id === senderId ? (
              <Messageself props={message} key={index} />
            ) : (
              <Messageother props={message} key={index} />
            );
          })}
          <div ref={endRef} />
        </div>

        <div className='w-full bg-white rounded-xl flex items-center h-[10%]'>
          <div className='w-[10%] flex items-center justify-center gap-2'>
            <MdOutlineEmojiEmotions onClick={() => setOpen((prev) => !prev)} className='sm:size-5 md:size-10' />
            <label className="cursor-pointer flex items-center justify-center rounded-md ">
              <FaRegImage className='sm:size-5 md:size-8' />
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
          <input 
            placeholder='Type a Message' 
            className='w-[82%] p-[1%] rounded-xl' 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            onKeyDown={sendChatByEnter}
          />
          <div className='w-[8%] h-full rounded-full flex items-center justify-center'>
            <IconButton onClick={sendChat}>
              <IoSend size={50} color='white' className='bg-green-500 w-full p-3 rounded-full ' />
            </IconButton>
          </div>    
        </div>
      </div>

      {/* Image Preview */}
      {selectedImage && (
        <div className='absolute bottom-[17%] left-[34%] w-[60%] bg-white flex items-center justify-center'>
          <img src={selectedImage} alt='' className='h-64 w-64'/>
        </div>
      )}

      {/* Emoji Picker */}
      {open && (
        <div className='absolute bottom-[14%] left-[32.5%]'>
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      )}
      <div className='sm:hidden w-screen h-dvh'>
       <Phonesidebar/>
      </div>
    </>
  );
}

export default Chatarea;
