import React, { useContext, useEffect } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import ChatContext from "../Context/chat-context";

const ScrollableChat = ({ messages }) => {
  useEffect(() => {
    console.log(messages);
  }, []);

  const { user } = useContext(ChatContext);
  function newTime(utcTimeString) {
    const utcTime = new Date(utcTimeString);
    const now = new Date();
    const differenceInMs = utcTime.getTime() - now.getTime();
    const localTime = new Date(now.getTime() + differenceInMs);
    const localTimeString = localTime.toLocaleTimeString();
    return localTimeString;
  }

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                />
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
                {newTime(message.createdAt)}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
