import React, { useEffect , useState } from "react";
import "./App.css";

import ChatPage from "./Pages/ChatPage";
import {BrowserRouter, Routes, Route, useLocation  } from "react-router-dom";
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
import SingleQuestion from "./components/community/SingleQuestion";
import NotFound from "./Pages/NotFound";
import User from "./Pages/User";
import Logout from "./components/Authentication/Logout";
import Notice from "./Pages/Notice";
import SingleNotice from "./components/Notices/SingleNotice";



function App() {
  // const location = useLocation();
  const [show, setShow] = useState(true);
  const baseName = window.location.pathname.split("/")[1];
  const baseName2 = window.location.pathname.split("/")[0];

  useEffect(()=>{

    console.log("location from app.js", baseName);
    if(baseName === "login" ||baseName === "register" ||baseName === "verify-email" ||baseName === "reset-password" ||baseName === "sendResetMail" ) {
      setShow(false);
    }
    else {
      setShow(true);
    }
    
  },[baseName ])




  return (
    <BrowserRouter >
    <ChatProvider>
    <div >
         {show &&  <Sidebar setShow={setShow} />}
          {/* auth routes  start*/}
          <Routes>
            <Route  path="/login" element={<Login setShow={setShow} />} />
            <Route  path="/register" element={<Signup />} />
            <Route  path="/verify-email" element={<VerifyEmail />} />
            <Route  path="/reset-password" element={<ResetPassword />} />
            <Route  path="/sendResetMail" element={<SendResetMail />} />
        
          {/* auth routes end */}
      
       
            <Route exact path="/" element={<Dashboard/>} />

            {/* chats routes */}
            <Route exact  path="/chats" element={<ChakraProvider><ChatPage /></ChakraProvider>} />
            {/* community page routes */}
            <Route  path="/community" element={<Community/>} />
            <Route path = "/community/singlequestion/:id" element= {<SingleQuestion/>} />
            {/*  user routes */}
            <Route path = "/user" element= {<User/>} />
            {/* notice routes */}
            <Route path = "/notice" element={<Notice/>} />
            <Route path ="/notice/singlenotice/:id" element={<SingleNotice/>} />
            {/* not found custom page */}
            <Route path = "*" element= {<NotFound/>} />
          </Routes>
         {show && <Footer/>}
          
    </div>

      <ToastContainer />
    </ChatProvider>
  </BrowserRouter>
  );
}

export default App;
