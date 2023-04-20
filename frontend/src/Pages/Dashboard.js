import React, { useRef } from "react";
import Sidebar from "../components/mainApp/Sidebar";

const Dashboard = () => {
  const updatref = useRef(null);
  // const updaterefClose = useRef(null);
  const passwordRef = useRef(null);
  // const passwordRefClose = useRef(null);

  return (
    <>
      <Sidebar />
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
                  student{" "}
                </span>
                <div className="card-body text-center shadow shadow-md">
                  <img
                    src="https://avatars.githubusercontent.com/u/51825251?v=4"
                    alt="avatar"
                    className="rounded-circle img-fluid m-auto"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">John Smith</h5>
                  <p className="text-muted mb-1">BCA 6th semester </p>
                  <p className="text-muted mb-4">
                    Department of computer science
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-teal"
                      onClick={() => {
                        updatref.current.click();
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
                      <p className="text-muted mb-0">Johnatan Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">example@example.com</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-3">
                      <p className="mb-0">Roll No</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">10310</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-3">
                      <p className="mb-0">Course</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">BCA</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-3">
                      <p className="mb-0">Semester </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">6th</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-3">
                      <p className="mb-0">Department</p>
                    </div>
                    <div className="col-9">
                      <p className="text-muted mb-0">
                        Department of computer Science
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  end of user detials sections */}
          </div>
          {/*  end of first col */}

          <div className="col col-3">
            <div className="card mb-4 position-relative">
              <div className="card-body shadow shadow-md">
                <h5 className="h5 text-teal text-capitalize my-3">
                  Latest Uploads
                </h5>
                    
                {/* single item */}
                <div className="my-3" >
                  <p>this si my quesion to the answer of the event </p>
                  <p className="text-end fs-6 text-sm text-muted">1 min ago</p>
                </div>
              {/* end of single item */}
                {/* single item */}
                <div className="my-3" >
                  <p>this si my quesion to the answer of the event </p>
                  <p className="text-end fs-6 text-sm text-muted">13 min ago</p>
                </div>
              {/* end of single item */}
                {/* single item */}
                <div className="my-3" >
                  <p>this si my quesion to the answer of the event </p>
                  <p className="text-end fs-6 text-sm text-muted"> 2 hour ago</p>
                </div>
              {/* end of single item */}
                {/* single item */}
                <div className="my-3" >
                  <p>this si my quesion to the answer of the event </p>
                  <p className="text-end fs-6 text-sm text-muted">By vikran Sharama</p>
                </div>
              {/* end of single item */}
                {/* single item */}
                <div className="my-3" >
                  <p>this si my quesion to the answer of the event lorem lorem this is mnto d fdjfis fd fidjfi  </p>
                  <p className="text-end fs-6 text-sm text-muted">By Sandeep Kumar</p>
                </div>
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
                    type="email"
                    className="form-control  border border-secondary"
                    id="email"
                    name="email"
                    required
                    minLength={10}
                    maxLength={50}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-id-card mx-1"></i>
                    Roll No
                  </label>
                  <input
                    type="number"
                    className="form-control  border border-secondary"
                    id="email"
                    name="email"
                    required
                    maxLength={4}
                    minLength={4}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
              </div>
              <div className="modal-footer text-start justify-content-center">
                <button type="submit" className="btn btn-teal">
                  {" "}
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
                Update Profile
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
                    <i className="fa fa-user mx-1" />
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="form-control  border border-secondary"
                    id="email"
                    name="email"
                    required
                    minLength={6}
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
                    id="email"
                    name="email"
                    required
                    maxLength={6}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
                <div className="mb-3 mx-2">
                  <label htmlFor="email" className="form-label">
                    <i className="fa fa-id-card mx-1"></i>
                    conform Password
                  </label>
                  <input
                    type="password"
                    className="form-control  border border-secondary"
                    id="email"
                    name="email"
                    required
                    maxLength={6}
                  />
                  <div className="invalid-feedback">
                    This field is required .
                  </div>
                </div>
              </div>
              <div className="modal-footer text-start justify-content-center">
                <button type="submit" className="btn btn-teal">
                  {" "}
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
    </>
  );
};

export default Dashboard;
