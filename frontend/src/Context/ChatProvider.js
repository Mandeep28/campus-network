import React, { useState, createContext, useContext } from "react";
import axios from "axios";

const ChatContext = createContext();

const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const {show , setshow} = useState(false);

 

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
          getUserDetails, 
          show, 
          setshow
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
