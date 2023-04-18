import React from "react";
import "./App.css";
//import {Button} from "@chakra-ui/button";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";

//() => window.setTimeout( () => { window.location.reload(true) },1500)


function App() {
  return (
    <div className="App">
    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/community" element={<Community/>} />
          </Routes>
    </div>
  );
}

export default App;
