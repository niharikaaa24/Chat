import React, { useState, useEffect } from "react";
import Conversationitems from "./Conversationitems";
import { IconButton } from "@mui/material";
import { HiUserAdd } from "react-icons/hi";
import { MdGroupAdd, MdLogout } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Conversationgroup from "../components/Conversationgroup";
import Cookies from "js-cookie";
import { BASE_URL } from "../data";
import { io } from "socket.io-client";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import socket from "../components/Socket";




const Sidebar = () => {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newMessageReceived, setNewMessageReceived] = useState(false);


  useEffect(() => {
    socket.on("sidebar", () => {
      setNewMessageReceived(true);
    });
    socket.on("newuser", () => {
      setNewMessageReceived(true);
    });
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.post(`${BASE_URL}/user/getmydetails`, {}, { withCredentials: true })
        setImage(data.imageUrl)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchDetails()
  }, [])

  const fetchChats = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/fetchchats`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };

  const filteredChats = data.filter((chat) =>
    chat.users.some((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fetchAllUsers = async () => {
    const users = await fetchChats();
    console.log(users)
    setData(users);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [id]);

  useEffect(() => {
    if (newMessageReceived) {
      fetchAllUsers();
      setNewMessageReceived(false);
    }
  }, [newMessageReceived]);

  const Logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <>
      <div className="w-full md:w-[40%] lg:w-[30%] cursor-pointer p-2 ">
        <div className="flex justify-center px-[5%] py-[3%] rounded-3xl w-full">
          <div className="w-[40%] ">
            <img src={image} alt="User" className="h-10 rounded-full w-10 " />
          </div>
          <div className="hidden sm:flex justify-between w-[60%] ">
            <IconButton onClick={() => navigate("addusers")}>
              <HiUserAdd className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={() => navigate("create-groups")}>
              <MdGroupAdd className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={() => navigate("users")}>
              <FaPlusCircle className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={Logout}>
              <PiDotsThreeOutlineVerticalFill className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
          </div>
          <div className="sm:hidden flex justify-between w-[60%] ">
            <IconButton onClick={() => navigate("/addusers")}>
              <HiUserAdd className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={() => navigate("/create-groups")}>
              <MdGroupAdd className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={() => navigate("users")}>
              <FaPlusCircle className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
            <IconButton onClick={Logout}>
              <PiDotsThreeOutlineVerticalFill className="lg:size-6 md:size-5 sm:size-4" />
            </IconButton>
          </div>
        </div>

        <div className="bg-white flex items-center p-1 my-4 rounded-full border-2">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search any user"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="b-none text-bg ml-[1%]  w-full rounded-r-full h-full outline-none  "
          />
        </div>

        <div className="bg-white flex overflow-y-auto scrollbar-thin scrollbar-track-gray-300 h-[72%] flex-col p-[1%] m-[3%] rounded-3xl">
          {filteredChats.length > 0 ? (
            filteredChats.map((conversation) => {
              if (conversation.isGroupChat === false) {
                return (
                  <Conversationitems
                    key={conversation._id}
                    props={conversation}
                  />
                );
              } else {
                return (
                  <Conversationgroup
                    key={conversation._id}
                    props={conversation}
                  />
                );
              }
            })
          ) : (
            <div className="flex items-center justify-center h-full text-xl font-semibold">
              Start A New Chat on Clicking Add Users
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Sidebar;

