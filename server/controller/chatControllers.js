const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new customError("user Id required", StatusCodes.BAD_REQUEST)
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

    // console.log("is chat is ", isChat)

  //populating with the user in that latestMessage.sender in our chat doc
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
    //1on1chat
  } else {//as per schema
    var chatData = {
      chatName: "sender", //just any string data
      isGroupChat: false,
      users: [req.user._id, userId], //both users
    };
    //console.log(chatData,'chatdata');

 
      const createdChat = await Chat.create(chatData);
      //console.log(createdChat, 'created and stored newChat')

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
      //console.log(fullChat, 'sending the created chat after populating both the user data inside the users[]');

      res.status(StatusCodes.OK).json(fullChat);
    
  }
};

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected

const fetchChats = async (req, res) => {
 

    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        //populating user inside latestMessage's sender
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });

        res.status(StatusCodes.OK).send(results);
        //console.log(results);
      });

};

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "Please Fill all the feilds" });
  }
  //stringified users array sent from FE //parsed here
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(StatusCodes.BAD_REQUEST).send("More than 2 users are required to form a group chat");
  }

  users.push(req.user); //loggedIn user by default added to the group as an admin


    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(StatusCodes.OK).json(fullGroupChat);
 
};

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate( chatId, { chatName: chatName }, { new: true } )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the request is sent from admin on FE

  const removed = await Chat.findByIdAndUpdate( chatId, { $pull: { users: userId } }, { new: true } )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  //console.log(removed);  

  if (!removed) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  //check if the requester is admin on FE

  const added = await Chat.findByIdAndUpdate( chatId, { $push: { users: userId } }, { new: true } )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  //console.log(added);
    
  if (!added) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };
