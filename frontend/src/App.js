import React, { useEffect, useState } from "react";
import "./App.css";

import ChatPage from "./Pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";
import Notice from "./Pages/Notice";
import Notes from "./Pages/Notes";
import NotFound from "./Pages/NotFound";
import Login from "./components/Authentication/Login";
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
import User from "./Pages/User";
import SingleNotice from "./components/Notices/SingleNotice";
import AllNotes from "./components/notes/AllNotes";
import HomePage from "./Pages/HomePage";
import Addons from "./Pages/Addons";



function App() {
  const unprotectedRoutes = ['/verify-email', '/reset-password', '/login', '/register', '/sendResetMail', '/'];
  const [show , setShow] = useState(false);
  let pathname = window.location.pathname;

  useEffect(()=>{
    if(unprotectedRoutes.includes(pathname)){
      setShow(false);
    }
    else {
      setShow(true);
    }
    
  },[pathname]);



  return (
   <>
    <div >
         {show &&  <Sidebar setShow={setShow} />}
          {/* auth routes  start*/}
          <Routes>
            <Route  exact path="/login" element={<Login setShow={setShow} />} />
            <Route  exact path="/register" element={<Signup />} />
            <Route  exact path="/verify-email" element={<VerifyEmail />} />
            <Route  exact path="/reset-password" element={<ResetPassword />} />
            <Route  exact path="/sendResetMail" element={<SendResetMail />} />
          </Routes>
          {/* auth routes end */}
        <section className="background px-3 py-2">
          <div className="bg-light rounded" style={{padding: "1px 0"}}>
          <Routes>

         
       
            <Route  exact path="/" element={<HomePage setShow={setShow}/>} />
            <Route  exact path="/dashboard" element={<Dashboard setShow={setShow}/>} />

            {/* chats routes */}
            <Route  exact path="/chats" element={<ChakraProvider><ChatPage /></ChakraProvider>} />
            {/* community page routes */}
            <Route  exact path="/community" element={<Community/>} />
            {/* <Route  exact path="/community/*" element={<Community/>} /> */}
            <Route path = "/community/singlequestion/:id" element= {<SingleQuestion/>} />
            {/*  user routes */}
            <Route exact path= "/user/*" element= {<User/>} />
            {/* notice routes */}
            <Route exact path= "/notice/*" element={<Notice/>} />
            <Route exact path="/notice/singlenotice/:id" element={<SingleNotice/>} />
            {/* notes routes  */}
            <Route exact path= "/notes/*" element={<Notes/>} />
            <Route exact path= "/notes/allnotes" element={<AllNotes/>} />
            {/*  add-ons routes */}
            <Route exact path="/addons/*" element={<Addons/>} />


            {/* not found custom page */}
            <Route exact path= "*" element= {<NotFound/>} />
          </Routes>
          </div>
        </section>
         {show && <Footer/>}
          
    </div>

      <ToastContainer />
      </>

  );
}

export default App;
