import React from 'react'

export default function Messages ({msg,message,user,id}) {
    if(user){
  return (
    <div 
    className={`${msg.id===id ? "float-right bg-blue-600 text-white ":"float-left  bg-gray-200 text-black"} p-3 rounded-md w-1/2 m-3   `}
    >
        {`${user}: ${message}`}
    </div>
        
  )
    }else{
        return (
    <div className={`${msg.id===id ? "float-right":"float-left"} p-3 rounded-md w-1/2 m-3 bg-gray-200 text-black `}>{`You: ${message}`}</div>

        )
    }
}
