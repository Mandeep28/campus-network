import React from "react";
import "./App.css";

import ChatPage from "./Pages/ChatPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";
import Login from "./components/Authentication/Login";
import ChatProvider from "./Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./components/Authentication/ResetPassword";
import Signup from "./components/Authentication/Signup";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import SendResetMail from "./components/Authentication/SendResetMail";



function App() {
  return (
    <BrowserRouter >
    <ChatProvider>
    <div >

          <Routes>
          {/* auth routes */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/verify-email" element={<VerifyEmail />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/sendResetMail" element={<SendResetMail />} />
            <Route exact path="/chats" element={<ChakraProvider><ChatPage /></ChakraProvider>} />

            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/community" element={<Community/>} />
          
          </Routes>
    </div>

      <ToastContainer />
    </ChatProvider>
  </BrowserRouter>
  );
}

export default App;
