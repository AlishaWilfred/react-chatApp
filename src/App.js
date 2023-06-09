import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Join from './components/Join';
import Chat from './components/Chat';
import socketio from "socket.io-client"

const socket=socketio("http://localhost:5000",{
  transports:["websocket"]
})

function App() {
  socket.on("connect",()=>{
    console.log("connected")
  })
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
