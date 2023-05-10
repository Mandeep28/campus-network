import React, { useEffect } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import moment from "moment";

const ScrollableChat = ({ messages }) => {
  useEffect(()=>{
    console.log(messages);
    
  },[])

  const { user } = ChatState();


  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          
          <div className="d-flex align-items-center gap-2" key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                {/* <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                /> */}
                <img src={message.sender.image} alt={message.sender.name} style={{width: "25px", height: "25px", borderRadius: "50%"}} />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user._id),
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {message.content}
              <span
                className=" text-muted d-block"
                style={{ fontSize: "10px",
                 letterSpacing: "0",
                 textAlign : message.sender._id === user._id ? "right" : "left"
               }}
              >
                {moment(message.createdAt).format('LT')}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
