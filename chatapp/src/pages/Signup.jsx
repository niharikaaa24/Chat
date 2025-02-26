import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import { BASE_URL } from "../data";

function Login() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-200 overflow-hidden">
      <div className="w-[90%] h-[90%] bg-white flex flex-col sm:flex-row rounded-xl">
        <LeftPart />
        <RightPart />
      </div>
    </div>
  );
}

const LeftPart = () => {
  return (
    <div className="hidden w-[20%] sm:w-[30%] sm:block bg-gray-200 h-[100%]  justify-center items-center">
      <img src={Logo} alt="" />
    </div>
  );
};

const RightPart = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [password, setPassword] = useState("");
  async function Login() {
    try {
      if (!name || !password || !email) {
        return toast.error("Please Complete All The fields");
      }
      axios
        .post(
          `${BASE_URL}/user/signup`,
          { name, password, email, file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            setFile(null);
            toast.success("Signup Successfully");
            navigate("/login");
          } else {
            toast.error(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  function setImage(event) {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  }
  return (
    <div className=" w-[100%] sm:w-[70%] flex flex-col justify-center items-center sm:h-screen pt-[2%]  overflow-y-scroll">
      <img src={Logo} alt="" className="sm:hidden w-32 mb-[5%]  " />
      <p className="w-full text-center font-bold text-xl md:text-2xl">
        Signup to your Account
      </p>
      <br />
      <div className="w-full flex flex-col justify-center items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="sm:w-32 sm:h-32 h-24 w-24 rounded-full "
          />
        ) : (
          <label>
            <FaRegUserCircle className="size-24" color="gray" />
            <input
              type="file"
              className="border-2 hidden"
              onChange={setImage}
            />
          </label>
        )}
        <p className="text-lg font-semibold mt-[1%] w-full text-center">
          Choose A Photo
        </p>
      </div>
      <br />
      <input
        type="text"
        placeholder="Enter Your Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-[2%] py-[1%] border-2 rounded-md"
      />
      <br />
      <input
        type="text"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-[2%] py-[1%] border-2 rounded-md"
      />
      <br />
      <input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-[2%] py-[1%] border-2 rounded-md"
      />
      <div className="w-full flex items-center justify-center my-[5%] sm:my-[2%]">
        <button
          onClick={Login}
          className="bg-black rounded-md text-white py-[1%] px-[5%]"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
