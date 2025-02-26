import React from 'react'
import { useNavigate } from 'react-router-dom'
import Default from '../assets/default.png'


function Conversationitems({ props }) {
  console.log(props)
  const id = localStorage.getItem('id')
  var name;
  var image;
  var content = "Start a New Chat";
  const navigate = useNavigate()

  if (props.latestMessage) {
    if (props.latestMessage.content.length < 30) {
      content = props.latestMessage.content
    }
    else {
      content = props.latestMessage.content.slice(0, 30)
    }

  }
  if (props.latestMessage === null) {

    content = "This Message has been Deleted"

  }
  if (id === props.users[0]._id) {
    name = props.users[1].name
    if (props.users[1].imageUrl !== null) {
      image = props.users[1].imageUrl
    }
    else {
      image = Default
    }
  }
  else {
    name = props.users[0].name
    if (props.users[0].imageUrl !== null) {
      image = props.users[0].imageUrl
    }
    else {
      image = Default
    }
  }
  return (

    <>
      <div className='hidden sm:flex bg-gray-100 rounded-xl w-[100%] my-[0.5%] lg:py-[2%] py-[1%]' onClick={() => { navigate(`chat/${props._id}`, { state: { id: props._id, name: name, length: 0, image: image } }) }} >
        <div className='w-[20%] rounded-full  '>
          <img

            src={image}
            className=" mx-auto rounded-full sm:w-12 sm:h-12 md:w-13 lg:w-14 lg:h-14"
          />
        </div>
        <div className='w-[80%] px-[3%] flex flex-col justify-center'>
          <p className='text-lg font-semibold'>{name}</p>
          <p className='text-sm'>{content}</p>
        </div>
      </div>
      <div className='flex sm:hidden bg-gray-100 rounded-xl  w-[100%] my-[0.5%]' onClick={() => { navigate(`/chat/${props._id}`, { state: { id: props._id, name: name, length: 0, image: image } }) }} >
        <div className='p-1 w-[30%]'>
          <img
            alt="n"
            src={image}
            className="h-14 mx-auto  rounded-full w-14"
          />
        </div>
        <div className='w-[70%] px-[3%] flex flex-col justify-center'>
          <p className='text-lg font-semibold'>{name}</p>
          <p className='text-sm'>{content}</p>
        </div>
      </div>
    </>



  )
}

export default Conversationitems