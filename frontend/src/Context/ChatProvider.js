import React, { useState, useEffect , createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import ChatContext from "./chat-context";
import axios from "axios";

const ChatContext = createContext();

const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // if(!localStorage.getItem("userToken")) {
    //   navigate("/login");
    // }
    // else {
      if(localStorage.getItem("userToken")){

        getUserDetails();
      }
    // }
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
    console.log(data.details);
    let tempData = data.details;
    tempData.token = token
    // console.log("temp Data", tempData.token)
    // setUser(tempData)
    setUser(tempData);

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
          getUserDetails
        }}
      >
        {props.children}
      </ChatContext.Provider>
    </div>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
