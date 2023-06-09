import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let user
export default function Join() {
    const [name,setName]=useState("")
    const sendUser=()=>{
         user=document.getElementById("input").value
         console.log(user)
    }
  return (
    
    <div  className='bg-black h-screen flex justify-center items-center'>

    <div className=' flex justify-center items-center text-white w-full  '>
        <div className='flex flex-col justify-center items-center  w-[50%] h-96 '>
            <div className='text-3xl font-bold  border-b pb-6 w-[50%] text-center p-2'>
         CHAT APP
            </div>
             <form className='flex flex-col  justify-center items-center gap-6 mt-10 '>

                <input placeholder='Enter your name' onChange={(e)=>{console.log(e.target.value)
                    setName(e.target.value)}}  className=' p-4 w-80 text-black rounded-md placeholder:text-gray-800' id="input"></input>
                <Link to="/chat" onClick={(e)=>{
                    if(!name){
                        alert("enter a name")
                        e.preventDefault()
                    }
                }}>
                <button type='submit' className='bg-red-600 text-white px-4 py-2 tracking-wide w-20  rounded-md' onClick={sendUser}>Join</button>
                </Link>
             </form>

            {/* <form className='flex flex-col  justify-center items-center gap-6 mt-10 '>
                <input onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' className=' p-4 w-80 rounded-md' id="input"></input>
                <Link to='/chat' className='w-full' onClick={(e)=>{
                    if(!name) {
                        alert("enter a valid name")
                        e.preventDefault()
                    } 
                }}>
                <button className='bg-red-600 text-white p-4  rounded-md w-full' onClick={sendUser}>LogIn</button>
                </Link>
            </form> */}
        </div>

    </div>
</div>
  )
}

export {user}