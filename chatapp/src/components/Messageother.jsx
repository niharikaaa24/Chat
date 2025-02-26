import React from 'react'

function Messageother({props}) {
  var props1 ={name:"Random User",message:"This is sample message"}
  var image = null;
  if(props.image!==null){
    image = props.image
   }
  return (
    <div>
      {image==null?(<div className='w-[100%] px-[3%] flex flex-col items-start my-[1%]'>
      <div className='bg-green-300 rounded-xl p-[2%]'>
      
      <p>{props.content}</p>
    
      </div>
      </div>)
      :(<div className='w-[100%] px-[3%] flex flex-col items-start my-[1%]'>
      <div className='bg-gray-100 rounded-xl p-[2%]'>
      <img src={image} alt="" className='h-40 w-64 bg-white'/>
      <p>{props.content}</p>
    
      </div>
      </div>)
    }
    </div>
  )
}

export default Messageother
