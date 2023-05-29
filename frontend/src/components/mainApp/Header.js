import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
// import { ChatState } from "../../Context/ChatProvider";
// import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import logo from '../../assets/images/logo.png'
import {  toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
// import { useToast } from "@chakra-ui/toast";
// import {  Spinner } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";

const Header = ({setShow }) => {
  const refClose = useRef(null);
  const refSearchModalClose = useRef(null);
  const [padding, setPadding] = useState(5); // set initial padding to 0px
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

const navigate = useNavigate();

  const {
    user,
    setUser,
    setSelectedChat,
    notification,
    setNotification,
    chats, setChats
  } = ChatState();

  const handleSearch = async() => {

    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };

      const { data } = await axios.get(`/api/v1/auth/users?search=${search}`, config);
      console.log(data, 'searchQuerry keyword response data');
      setLoading(false);
      setSearchResult(data);

    } catch (error) {

      console.log(error.message);
      toast.error("failed to load chat result", {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }
    setSearch("");
    
  };


  

  const accessChatCreateChat = async (userId) => {
    //console.log(userId); id of selected user

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log(data);

      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]); 
      //already existing check clause //newly created chat above the rest

      setSelectedChat(data);

      console.log(data, 'access new/existing chat response data');

      setLoadingChat(false);
      refSearchModalClose.current.click(); // close the serch drawer
    } catch (error) {

      console.log(error.message);
      toast.error("Error in fetching the chats", {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }
  };

  const handleClick = () => {
    refClose.current.click();
  };
  useEffect(() => {
    // add event listener to update width on resize
    window.addEventListener('resize', handleResize);

    // cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // set padding based on width
    if (width <= 800) {
      setPadding(0);
    } else {
      setPadding(5);
    }
    //  console.log(location.pathname);
     if(location.pathname ==="/chats") {
      // console.log("true");
      setShowSearch(true);
      
     }
     else {
      setShowSearch(false)
     }
     
    
  }, [width , location]);

  const handleResize = () => setWidth(window.innerWidth);


  return (
    <>
    {/* sidedrawer */}
    <>
 
  <div
    className="offcanvas offcanvas-start"
    tabIndex={-1}
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title h5 text-teal" id="offcanvasExampleLabel">
        Search User
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        ref={refSearchModalClose}

      />
    </div>
    <div className="offcanvas-body">
    {/* <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody> */}
          
            <Box d="flex" pb={2}>
             
              <input
  className="form-control me-2"
  type="search"
  placeholder="Search"
  aria-label="Search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

              <button className="btn btn-teal" onClick={handleSearch}>Go</button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => ( //user clicked on for chat
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChatCreateChat(user._id)}
                />
              ))
            )} 
            {loadingChat && <span
  className="spinner-border spinner-border-sm mx-auto d-block my-2"
  role="status"
  aria-hidden="true"
/>
}
          {/* </DrawerBody>
        </DrawerContent> */}
    </div>
  </div>
</>







    {/* header  */}
    <nav className={`navbar bg-body-tertiary positon-static  px-${padding} `}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
        <Link className="navbar-brand text-uppercase text-teal logo" to="/dashboard">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      
        <div className="d-flex align-items-center"> 
       
     {showSearch &&  <i className="fa fa-search mx-1 text-teal fs-5"  type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample"
    aria-controls="offcanvasExample"></i>}
        <div className="dropdown">
          <a
          
            className="btn  btn-sm dropdown-toggle"
            role="button"
            href="#!"
            // eslint-disable-next-line
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
           <i className="fa fa-bell mx-1 fs-5 text-teal "></i>
          </a>

          <ul className="dropdown-menu p-1 py-2" style={{fontSize: "12px" , transform: "translate(-60%, 2%)"}}>
            {!notification.length && "No New Messages"}
            {notification.map((notif) => (
              <li
                className="p-1"
                style={{ borderBottom: "1px solid gray" }}
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/chats"><i className="fa fa-commenting fs-5 text-teal"></i> </Link>

        <i
          className="navbar-toggler fa fa-bars fs-5 "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon" /> */}
        </i>
        </div>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            
            <img src={logo} alt="logo" className="logo" />
          
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              ref={refClose}
            />
          </div>
          <div className="offcanvas-body" style={{background: "linear-gradient(to top, #9edacb, transparent)"}}>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 text-teal">
              <li className="nav-item" onClick={handleClick}>
                <Link
                  className="nav-link text-teal  "
                  aria-current="page"
                  to="/dashboard"
                >
                  <i className="fa fa-home mx-1"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item" onClick={handleClick}>
                <Link className="nav-link text-teal" to="/notice">
                  <i className="fa fa-flag mx-1"></i> Notices
                </Link>
              </li>
              <li className="nav-item" onClick={handleClick}>
                <Link className="nav-link text-teal" to="/notes">
                  <i className="fa fa-book mx-1"></i> Notes
                </Link>
              </li>
              <li className="nav-item" onClick={handleClick}>
                <Link className="nav-link text-teal" to="/community">
                  <i className="fa fa-users mx-1"></i> Community
                </Link>
              </li>
             {user && (user.role ==="admin") ? <li className="nav-item" onClick={handleClick} >
                <Link className="nav-link text-teal" to="/user">
                  <i className="fa fa-users mx-1"></i> Users
                </Link>
              </li> : ""}
             {user && (user.role ==="admin") ? <li className="nav-item" onClick={handleClick} >
                <Link className="nav-link text-teal" to="/addons">
                  <i className="fa fa-users mx-1"></i> Addons
                </Link>
              </li> : ""}
              <li className="nav-item" onClick={handleClick}>
                <button className="nav-link text-teal cursor-pointer w-100 text-start"  onClick={()=>{
                  localStorage.clear();
                  setShow(false);
                  setUser({});
                  navigate("/");
                }}>
                  <i className="fa fa-sign-out mx-1"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;
