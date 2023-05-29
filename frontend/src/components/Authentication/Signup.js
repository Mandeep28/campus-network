import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  //  show hide the password
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(role, name, email, password, confirmpassword);

    if (!name || !email || !password || !confirmpassword || !role) {
      toast.warn("Please fill all the fields", {
        position: "top-right",
        autoClose: 4000,
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
    if (password !== confirmpassword) {
      toast.warn("Password not match", {
        position: "top-right",
        autoClose: 4000,
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

    // console.log(name, email);

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/v1/auth/register",
        { name, email, password, hidden: role },
        config
      );
      console.log(data);

      toast.success("Check the mail to verify account", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setName("");
      setEmail("");
      setConfirmpassword("");
      setPassword("");
      setRole("");

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
      setName("");
      setEmail("");
      setConfirmpassword("");
      setPassword("");
      setRole("");
      setLoading(false);
    }
  };
  const handleRadio = (e) => {
    // console.log(e.currentTarget.checked);

    setRole(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i
                  className="fa fa-user-plus fa-lg"
                  style={{ color: "#04a9f5" }}
                />
              </div>
              <h3 className="mb-4">Sign up</h3>
              <form action="">
                <div
                  className="d-flex justify-content-start align-item-start"
                  style={{ width: "100%" }}
                >
                  <p> Sign Up As: </p>
                  <div className="form-check mx-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="student"
                      style={{ cursor: "pointer" }}
                      onClick={handleRadio}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      style={{ cursor: "pointer" }}
                      value="teacher"
                      onClick={handleRadio}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Teacher
                    </label>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </div>
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
                <div className="input-group mb-4 border border-1 ">
                  <input
                    type="password"
                    className="form-control border-none"
                    style={{ outline: "none", border: "none" }}
                    placeholder="Re-enter password"
                    value={confirmpassword}
                    onChange={(e) => {
                      setConfirmpassword(e.currentTarget.value);
                    }}
                  />
                  <i className="m-auto mx-1 fa fa-eye " onClick={showHide} />
                </div>
                <div className="form-group text-left"></div>
                <button
                  type="submit"
                  className="btn btn-primary my-2 shadow shadow-lg"
                  onClick={submitHandler}
                  disabled={loading}
                  style={{ backgroundColor: "#04a9f5" }}
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  SignUp
                </button>
              </form>
              <p className="mb-0 text-muted">
                Allready have an account?
                <Link className="mx-1" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
