import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {  toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const updatref = useRef(null);
  const updateRefClose = useRef(null);
  const passwordRef = useRef(null);
  const passwordRefClose = useRef(null);
  const { user , getUserDetails } = ChatState();
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


  useEffect(() => {
    fetchDetails();
    fetchLatestNotice();
  }, []);

  const fetchDetails = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get("/api/v1/auth/getDetail", config);
      // console.log(data);
      setDetails(data.details);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
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

  // change time
  function getTimeForNotice(utcTimeString) {
    const utcTime = new Date(utcTimeString);
    const now = new Date();
    const differenceInMs = now.getTime() - utcTime.getTime();
    const hours = Math.floor(differenceInMs / 3600000);
    const minutes = Math.floor((differenceInMs % 3600000) / 60000);
    // console.log("hours is ", hours, "minutes is :", minutes);

    if (hours > 0 && minutes > 0) {
      let returnVal = `${hours} hrs ${minutes} min ago`;
      // console.log(returnVal);

      return returnVal;
    } else if (hours > 0 && minutes < 0) {
      let returnVal = `${hours} hrs  ago`;
      // console.log(returnVal);
      return returnVal;
    } else if (hours < 0 && minutes > 0) {
      let returnVal = ` ${minutes} min ago`;
      // console.log(returnVal);
      return returnVal;
    }
  }

//  handle pic upload to cloudinary
const postDetails = (pics) => {
  setLoading(true);
  if (pics === undefined) {
    console.log("please select an image");
    
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
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } else {
    console.log("please select image of type jpeg , png, jpg only");
    
    setLoading(false);
    return;
  }
};






  //  perform update profile functionality
  const handlUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("image url is", pic, "name is ", name);
    
    
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
    console.log(password , confirmpassword , oldpassword);
    
   
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
      console.log(data);

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
                              {details ? details.rollNo : "00000"}
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
                              {details ? details.course : "null"}
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
                          {details ? details.department.name : "null"}
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
                      <a
                        href="#!"
                        className="text-decoration-none text-dark"
                        key={item._id}
                      >
                        <article>
                          <p>{item.title} </p>
                          <div className="d-flex justify-content-between fs-6">
                            <p style={{ fontSize: "9px" }}>
                              By - {item.uploadBy.name}
                            </p>
                            <p
                              className="text-end"
                              style={{ fontSize: "8px " }}
                            >
                              {getTimeForNotice(item.updatedAt)}
                            </p>
                          </div>
                        </article>
                      </a>
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
                <input
                  type="hidden"
                  name="action"
                  defaultValue="updateProfile"
                />
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
                {user && user.role === "student" ? (
                  !user.rollNo ? (
                    <div className="mb-3 mx-2">
                      <label htmlFor="email" className="form-label">
                        <i className="fa fa-id-card mx-1"></i>
                        Roll No
                      </label>
                      <input
                        type="number"
                        className="form-control  border border-secondary"
                        id="rollNo"
                        name="rollNo"
                        required
                        maxLength={4}
                        minLength={4}
                      />
                      <div className="invalid-feedback">
                        This field is required .
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
                    <i className="fa fa-user mx-1" />
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="form-control  border border-secondary"
                    id="oldpassword"
                    name="oldpassword"
                    required
                    // minLength={6}
                    value={oldpassword}
                    onChange={(e)=> setOldpassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-id-card mx-1"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control  border border-secondary"
                    id="password"
                    name="password"
                    required
                    // maxLength={6}
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-id-card mx-1"></i>
                    Re-Enter new Password
                  </label>
                  <input
                    type="password"
                    className="form-control  border border-secondary"
                    id="confirmpassword"
                    name="confirmpassword"
                    required
                    // maxLength={6}
                    value={confirmpassword}
                    onChange={(e)=> setConfirmpassword(e.target.value)}
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

export default Dashboard;
