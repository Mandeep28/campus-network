import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "./chat-context";
import axios from "axios";

const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("userToken")) {
      navigate("/login");
    }
    else {
      getUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);




const getUserDetails = async ()=>{
  let token = localStorage.getItem("userToken")
  try {
    const config = {
      headers: { "Content-type": "application/json",
      'auth-token': token,
    },
    };

    const { data } = await axios.get(
      "/api/v1/auth/getuserdetail", config
    );
    // console.log(data.details);
    setUser(data.details)

    // setLoading(false);
  } catch (error) {
    console.log(error.response.data);
   
  }
}




  return (
    <div>
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          notification,
          setNotification,
        }}
      >
        {props.children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
