import React, { useState, useEffect} from "react";

import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
// import SideDrawer from '../components/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';
import { ChatState } from "../Context/ChatProvider";
import WithAuth from "../components/Authentication/WithAuth";


const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user , getUserDetails } = ChatState();
  useEffect(()=>{
    getUserDetails();
    console.log(user);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <div className="background" style={{ width: "100%"  }}>
      {/* <SideDrawer /> */}
          <Box d="flex" justifyContent="space-between" width="100%" h="90.5vh" p="12px">
           <MyChats fetchAgain={fetchAgain} userDetails={user} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
      
    </div>
  );
};

export default WithAuth(ChatPage);
