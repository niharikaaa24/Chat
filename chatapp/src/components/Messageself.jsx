import React, { useState } from 'react'
import { MdGTranslate } from "react-icons/md";
import axios from 'axios';
import { BASE_URL } from '../data';

function Messageself({ props }) {
  const[message,setMessage] = useState(props.content)
  const onClick = async()=>{
    const {data} = await axios.post(`${BASE_URL}/translate`,{sentence:props.content,fromLanguage:"en",toLanguage:"hi"})
    setMessage(data.translatedData.translation)
  }

  var image = null;



  if (props.image !== null) {
    image = props.image
  }

  const handleClick = () => {
    window.open(`${image}`, '_blank');
  };

  return (
    <div>
      {image === null ?
        (
          <div className='px-[3%] flex justify-end items-center gap-2 my-[1%] relative group'>
            <div className='bg-green-500 text-white rounded-xl p-[2%] flex items-center relative'>
              <MdGTranslate
                onClick={onClick}
                size={20}
                className='absolute left-[-30px] hidden group-hover:flex items-center text-black'
              />
              <p className='text-sm font-semibold md:text-base'>{message}</p>
            </div>
          </div>

        )
        : (<div className=' px-[3%] flex flex-col items-end my-[1%]'>
          <div className='bg-gray-100 rounded-xl p-[2%]' onClick={handleClick}>
            <img src={image} alt="" className='h-32 w-48 md:h-40 md:w-64  bg-white' />
            <p className='text-sm'>{props.content}</p>

          </div>
        </div>
        )}
    </div>
  )
}

export default Messageself