import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {  toast } from "react-toastify";
import axios from "axios";
import moment from 'moment';
import { Link } from "react-router-dom";
import WithAuth from "../components/Authentication/WithAuth";
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:5000"; //development
// var socket, selectedChatCompare;

const Dashboard = ({setShow}) => {
  const updatref = useRef(null);
  const updateRefClose = useRef(null);
  const passwordRef = useRef(null);
  const passwordRefClose = useRef(null);

  const [details, setDetails] = useState({});
  const [LatestNotice, setLatestNotice] = useState([]);
  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [passloading, setPassloading] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [courseName , setCourseName] = useState("");

  const { user , getUserDetails } = ChatState();



  useEffect(() => {
    setShow(true);
    if (!user) {
      getUserDetails();
    } else {
      console.log("user details", user);
      fetchDetails();
      fetchLatestNotice();
    
    }
   
  }, [user, getUserDetails]);


  // useEffect(()=>{
  //   console.log("user is this (from single chats)", user)
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  // })





  const fetchDetails = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get("/api/v1/auth/getDetail", config);
      // console.log(data.details);
      setDetails(data.details);
      setdepartment(data);
      // console.log(data.details.course.name);
      
      

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //  fetch latest notice
  const fetchLatestNotice = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get("/api/v1/user/latestNotice", config);
      // console.log(data.data);
      setLatestNotice(data.data);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }; 



  const setdepartment = (data)=>{
  
      if(user.role === "student") {
        // console.log(data.details.course.department.name);
        
      setDepartmentName(data.details.course.department.name);
      setCourseName(data.details.course.name);
    }
    else if(user.role ==="teacher") {
      // console.log(data.details.department.name)
      setDepartmentName(data.details.department.name);

    }
  
  }

//  handle pic upload to cloudinary
const postDetails = (pics) => {
  setLoading(true);
  if (pics === undefined) {
    // console.log("please select an image");
    toast.warn("please select an image", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    });
    
    return;
  }
  console.log(pics);
  if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "campus_Network");
    data.append("cloud_name", "dyk8ixmrn");
    fetch("https://api.cloudinary.com/v1_1/dyk8ixmrn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        // setUrl(data.url.toString());
        // console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Someting went wrong , try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "colored",
        });
        setLoading(false);
      });
  } else {
    // console.log("please select image of type jpeg , png, jpg only");
    toast.warn("please select image of type jpeg , png, jpg only", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    
    setLoading(false);
    return;
  }
};






  //  perform update profile functionality
  const handlUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("image url is", pic, "name is ", name);
    
    
    if(!pic || !name ) {
      toast.warn("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setLoading(false);
      return
    }
  
   let token = localStorage.getItem("userToken");
   
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.put(
        "/api/v1/auth/updateProfile",
        { image: pic, name: name },
        config
      );
      console.log(data);

      toast.success("Profile Updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });


      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setLoading(false);
    }
    getUserDetails();
    updateRefClose.current.click();
  };
  //  peform change password 
  const handleChangePassword = async (e)=>{
    e.preventDefault();
    // console.log(password , confirmpassword , oldpassword);
    if(!password || !oldpassword || !confirmpassword) {
      toast.warn("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      return;
    }

    if(password !== confirmpassword) {
      toast.warn("new password not match with confirm password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      return;
    }
   
    setPassloading(true);
   
  
   let token = localStorage.getItem("userToken");
   
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        "/api/v1/auth/changePassword",
        { oldpassword, password },
        config
      );
      // console.log(data);

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });


      setPassloading(false);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setPassloading(false);
      setPassword("");
      setOldpassword("");
      setConfirmpassword("");
    }
    // getUserDetails();
    setPassloading(false);
    setPassword("");
    setOldpassword("");
    setConfirmpassword("");
    passwordRefClose.current.click();
  }


  const showHide = (item) => {
    let icon = item.currentTarget;
    if (icon.classList.contains("fa-eye")) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
      icon.previousElementSibling.type = "text";
    } else {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
      icon.previousElementSibling.type = "password";
    }
  };




  return (
    <>
      <section
        style={{ minHeight: "100vh" }}
        id="dashborad-section"
        className="background section"
      >
        <div className=" row py-5 px-5">
          <div className="col col-9">
            {/* photo section */}
            <div>
              <div className="card mb-4 position-relative">
                <span className="position-absolute top-0 start-0  badge rounded-pill bg-teal m-2">
                  {user ? user.role : "student"}
                </span>
                <div className="card-body text-center shadow shadow-md">
                  <img
                    src={
                      user
                        ? user.image
                        : "https://avatars.githubusercontent.com/u/51825251?v=4"
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid m-auto"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5 className="my-3">{user ? user.name : "Null"}</h5>
                  <p className="text-muted mb-3">
                    {user ? user.email : "example@gmail.com"}{" "}
                  </p>

                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-teal"
                      onClick={() => {
                        updatref.current.click();
                        setName(user.name);
                      }}
                    >
                      Update profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-teal ms-1"
                      onClick={() => {
                        passwordRef.current.click();
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*  end of photo section */}
            {/*  user details sections */}
            {user && user.role !== "admin" ? (
              <div>
                <div className="card mb-4">
                  <div className="card-body py-3 shadow shadow-md">
                    <h2 className="h2 my-3 mb-4 text-teal text-uppercase ">
                      User Details
                    </h2>
                    <div className="row my-2">
                      <div className="col-3">
                        <p className="mb-0"> Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {" "}
                          {details ? details.name : "null"}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row my-2">
                      <div className="col-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {" "}
                          {details ? details.email : "example@gmail.com"}
                        </p>
                      </div>
                    </div>
                    <hr />
                    {user && user.role !== "teacher" ? (
                      <>
                        {" "}
                        <div className="row my-2">
                          <div className="col-3">
                            <p className="mb-0">Roll No</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {" "}
                              {details ? details.rollno : "00000"}
                            </p>
                          </div>
                        </div>
                        <hr />{" "}
                      </>
                    ) : (
                      ""
                    )}
                    {user && user.role !== "teacher" ? (
                      <>
                        {" "}
                        <div className="row my-2">
                          <div className="col-3">
                            <p className="mb-0">Course</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {" "}
                              {details ? courseName : "null"}
                            </p>
                          </div>
                        </div>{" "}
                        <hr />{" "}
                      </>
                    ) : (
                      ""
                    )}

                    {user && user.role !== "teacher" ? (
                      <>
                        {" "}
                        <div className="row my-2">
                          <div className="col-3">
                            <p className="mb-0">Semester </p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {" "}
                              {details ? details.semester : "null"}th
                            </p>
                          </div>
                        </div>{" "}
                        <hr />
                      </>
                    ) : (
                      ""
                    )}

                    <div className="row my-2">
                      <div className="col-3">
                        <p className="mb-0">Department</p>
                      </div>
                      <div className="col-9">
                        <p className="text-muted mb-0">
                          {details ? departmentName : "null"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/*  end of user detials sections */}
          </div>
          {/*  end of first col */}

          <div className="col col-3">
            <div className="card mb-4 position-relative">
              <div className="card-body shadow shadow-md">
                <h5 className="h5 text-teal text-capitalize my-3">
                  {" "}
                  Latest Notice{" "}
                </h5>
                {LatestNotice &&
                  LatestNotice.map((item, index) => {
                    return (
                     
                        <article key={item._id}>
                          <p> <Link to={`/notice/singlenotice/${item._id}`}> {item.title}</Link> </p>
                          <div className="d-flex justify-content-between fs-6">
                            <div>
                            <img src={item.uploadBy.image} alt="upload by profile" style={{width:"24px"}} />
                            <p  className="d-inline-block mx-1" style={{fontSize: "12px"}}>
                              By - {`${item.uploadBy.name}`}
                            </p>
                            </div>
                            
                            <p
                              className="text-end text-de"
                              style={{ fontSize: "9px "}}
                            >
                              {moment(item.createdAt).fromNow()}
                            </p>
                          </div>
                        </article>
                     
                    );
                  })}

                {/* end of single item */}
              </div>
            </div>
          </div>
          {/*  end of second col */}
        </div>
      </section>

      {/* update porfile modal start here */}
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateModal"
        ref={updatref}
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={-1}
        aria-labelledby="updateModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-teal" id="updateModalLabel">
                Update Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={updateRefClose}
              />
            </div>
            <form
              method="post"
              className="needs-validation my-2"
              encType="multipart/form-data"
              noValidate=""
            >
              <div className="modal-body">
               
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-camera mx-1" />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    className="form-control  border border-secondary"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>

                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-user mx-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control  border border-secondary"
                    id="name"
                    name="name"
                    defaultValue={user && name}
                    required
                    minLength={10}
                    maxLength={50}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
               
              </div>
              <div className="modal-footer text-start justify-content-center">
              <button
                  type="submit"
                  className="btn btn-teal my-2 shadow shadow-lg"
                  onClick={handlUpdateProfile}
                  disabled={loading}
                  
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*  end of update profile modal  */}

      {/*  change password modal start */}
      {/* update porfile modal start here */}
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#changePasswordModal"
        ref={passwordRef}
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex={-1}
        aria-labelledby="changePasswordModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-teal"
                id="changePasswordModalLabel"
              >
                Change Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form
              method="post"
              className="needs-validation my-2"
            >
              <div className="modal-body">
             

                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-lock mx-1" />
                    Old Password
                  </label>
                  <div className="input-group mb-4 border border-1 ">
                  <input
                    type="password"
                    className="form-control border-none"
                    style={{ outline: "none", border: "none" }}
                    placeholder=" password"
                    value={oldpassword}
                    onChange={(e) => {
                      setOldpassword(e.currentTarget.value);
                    }}
                  />
                  <i className="m-auto mx-1 fa fa-eye " onClick={showHide} />
                </div>
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-lock mx-1"></i>
                    New Password
                  </label>
                  <div className="input-group mb-4 border border-1 ">
                  <input
                    type="password"
                    className="form-control border-none"
                    style={{ outline: "none", border: "none" }}
                    placeholder=" password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                  />
                  <i className="m-auto mx-1 fa fa-eye " onClick={showHide} />
                </div>
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-lock mx-1"></i>
                    Re-Enter new Password
                  </label>
                  <div className="input-group mb-4 border border-1 ">
                  <input
                    type="password"
                    className="form-control border-none"
                    style={{ outline: "none", border: "none" }}
                    placeholder=" password"
                    value={confirmpassword}
                    onChange={(e) => {
                      setConfirmpassword(e.currentTarget.value);
                    }}
                  />
                  <i className="m-auto mx-1 fa fa-eye " onClick={showHide} />
                </div>
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
              </div>
              <div className="modal-footer text-start justify-content-center">
              <button
                  type="submit"
                  className="btn btn-teal my-2 shadow shadow-lg"
                  onClick={handleChangePassword}
                  disabled={passloading}
                  
                >
                  <span
                    className={
                      passloading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  Change password
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={passwordRefClose}
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Dashboard);
