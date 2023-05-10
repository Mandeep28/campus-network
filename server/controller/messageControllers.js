
const Message = require("../models/messageModel");
const User = require("../models/User");
const Chat = require("../models/chatModel");
const { StatusCodes } = require("http-status-codes");



const allMessages = async (req, res) => {

 
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "-password")
      .populate("chat");

    res.json(messages);
    

};



const sendMessage = async (req, res) => {

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  //schema 
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  
    var message = await Message.create(newMessage);

    //populating the instance
    message = await message.populate("sender", "name");
    message = await message.populate("chat");

    //populating with the user in that chat field of our message doc instance
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);

 
};

module.exports = { allMessages, sendMessage };