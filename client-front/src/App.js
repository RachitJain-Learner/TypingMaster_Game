import React, {useState,useEffect} from "react";
import Multiplayer from "./pages/Multiplayer";
import Navbar from "./components/Navbar";
import Solo from "./pages/Solo";
import Home from './pages/Home'
import { Routes, Route,useNavigate } from "react-router-dom";
import socket from './socket' ;
import CreateGame from '../src/components/CreateGame';
import JoinGame from '../src/components/JoinGame';

function App(){
  
  const [gameState,setGameState] = useState({_id:"",isOpen:false,players:[],words:[]});
  const navigate = useNavigate();
  useEffect(() =>{
    // socket.on('test', (message) =>{
    //   console.log(message);
    // });

    socket.on('updatGame',(game) =>{
      console.log(game);
      setGameState(game);
    })

    // return ()=>{
    //   socket.removeAllListeners();
    // }
    return () => {
      socket.off('test');
    };
  }, []);

  useEffect(()=>{
    if(gameState._id !== ""){
       navigate(`/game/${gameState._id}`);
    }
  },[gameState._id]);

  return (
      <div className="w-full h-[100vh]">
        <div className="w-full h-12">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Solo" element={<Solo/>}/>
          <Route path="/Multiplayer" element={<Multiplayer/>}/>
          <Route path="/CreateGame" element={<CreateGame/>}/>
          <Route path="/JoinGame" element={<JoinGame/>}/>
        </Routes>
      </div>
)};

export default App;
