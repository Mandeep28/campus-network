import React, { useEffect, useState } from 'react';
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
//import { useHelper } from '../config/helper-hook';
import moment from 'moment'

const MyChats = ({ fetchAgain, userDetails }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  //const {getSender}=useHelper();

  const toast = useToast();
  
  const fetchChats = async () => {
    console.log("user details is (from my chats)",userDetails);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data, 'fetching all users chats in my chats');
      setChats(data);

    } catch (error) {

      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };



  useEffect(() => {
    setLoggedUser(user); //chatLogics 
    console.log("logged use from my chats", loggedUser);
    
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  //fetching chats again witht the updated list of all of our chats...
  //--when we leave a group our updated list of chats needs to be fetched again

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize="1.5rem"
        fontFamily="sans-serif"
        d="flex"
        w="100%"
        flexDirection={{lg: "row", md: "column-reverse"}}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <button className='btn btn-teal' >
            New Group Chat <i className="fa fa-plus mx-1"></i>
          </button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, i) => (
              
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
                  <div className='d-flex justify-content-between my-1' style={{fontSize: "12px"}}>
                  <span >
                {(chat.latestMessage.content).slice(0,25)}
                {((chat.latestMessage.content).length > 25) ?  '.....' : ""}
                  
                  </span>
                  <span >{moment(chat.latestMessage.createdAt).calendar()}</span>
                  </div>
                  
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
