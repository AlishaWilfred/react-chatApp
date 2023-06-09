import React, { useEffect, useState } from "react";
import socketio from "socket.io-client";
import { user } from "./Join";
import { Link } from "react-router-dom";
import Messages from "./Messages";
import ReactScrollToBottom from "react-scroll-to-bottom"

let socket;
export default function Chat() {
  const [id, setId] = useState("");
  const[connected,setConnected]=useState(false)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = socketio("http://localhost:5000", { transports: ["websocket"] });
    socket.on("connect", () => {
        console.log(socket)
      setId(socket.id);
      setConnected(socket.connected)
    });
    socket.emit("user-joined", { user });
    socket.on("welcome", (data) => {
      console.log("data", data);
      setMessages([...messages, data]);
    });
    socket.on("joined", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("left",(data)=>{
        setMessages([...messages,data])
    })
    return () => {
      socket.off();
    };
  }, []);
  useEffect(()=>{
socket.on("message",(data)=>{
    console.log("messagessss",data)
    setMessages([...messages,data])
})

return(()=>{
    socket.off()
})
  },[messages])

  const sendMessages = () => {
    const message = document.getElementById("chatinput").value;
    console.log("message", message);
        socket.emit("send-message",({message,id}))
        document.getElementById("chatinput").value=""
  };
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-white w-[50%] h-[90%]">
        <div className="bg-red-600 h-[10%] flex items-center justify-between">
          <div className="flex items-center justify-between relative ">
            {/* <h2 className="text-white   font-bold text-xl p-4">Live Chat </h2> */}
            <div className={`${connected?"bg-green-700 px-2 absolute top-3 -left-3 ml-4  border w-4 h-4 rounded-full":""}`}></div>
            <h3 className="text-white font-bold text-xl ml-3 p-4 first-letter:uppercase">{user}</h3>
          </div>
          <Link to="/">
            <span className="float-right px-6 cursor-pointer hover:scale-105 text-white text-2xl">
              x
            </span>
          </Link>
        </div>
        <ReactScrollToBottom className='border-2 border-black h-[80%] overflow-y-auto'>
        {messages.map((msg,i)=>(
            
              <Messages  message={msg.message} msg={msg} user={msg.id===id?"You":msg.user} id={id}/>
        ))}
        </ReactScrollToBottom>
        {/* <ReactScrollToBottom className="border-2 border-black h-[70%] overflow-y-auto">
          {messages.map((item, i) => (
            <Messages
              message={item.message}
              item={item}
              id={id}
              user={item.id === id ? "You" : item.user}
            />
          ))}
        </ReactScrollToBottom> */}
        <div className="border h-[10%] flex items-center justify-between ">
          <input
            id="chatinput"
            type="text"
            placeholder="Send a message"
            onKeyDown={(e)=>e.key==="Enter"?sendMessages():null}
            className="px-6 placeholder:text-xl h-full w-[80%] outline-none"
          ></input>
          <button
            onClick={sendMessages}
            className="text-xl bg-red-600 w-[20%] h-full text-white cursor-pointer outline-none hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
