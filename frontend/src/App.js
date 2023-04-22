import React from "react";
import "./App.css";

import ChatPage from "./Pages/ChatPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";
import Login from "./components/Authentication/Login";
import ChatProvider from "./Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./components/Authentication/ResetPassword";
import Signup from "./components/Authentication/Signup";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import SendResetMail from "./components/Authentication/SendResetMail";
import Sidebar from "./components/mainApp/Header";
import Footer from "./components/mainApp/Footer";



function App() {
  return (
    <BrowserRouter >
    <ChatProvider>
    <div >

          {/* auth routes  start*/}
          <Routes>
            <Route  path="/login" element={<Login />} />
            <Route  path="/register" element={<Signup />} />
            <Route  path="/verify-email" element={<VerifyEmail />} />
            <Route  path="/reset-password" element={<ResetPassword />} />
            <Route  path="/sendResetMail" element={<SendResetMail />} />
          </Routes>
          {/* auth routes end */}
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />

            {/* chats routes */}
            <Route exact  path="/chats" element={<ChakraProvider><ChatPage /></ChakraProvider>} />
            {/* community page routes */}
            <Route  path="/community" element={<Community/>} />
          </Routes>
          <Footer/>
          
    </div>

      <ToastContainer />
    </ChatProvider>
  </BrowserRouter>
  );
}

export default App;
