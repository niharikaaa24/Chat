import axios from "axios";
import Cookies from 'js-cookie'

export const fetchChats = async () => {
    try {
      const response = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/fetchchats", { token: Cookies.get("token") });
      return response.data;
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };