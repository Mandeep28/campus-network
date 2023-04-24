import { useState } from "react";
import {  toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const Login = ({setShow}) => {

// if user Token is present in localStorage then no need to show the login page (redirect user to dashboard)
const abortController = new AbortController();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!email || !password) {
      toast.warn("Email and password must be required", {
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

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        config
      );
      console.log(data);

      toast.success("Account Login Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      localStorage.setItem("userToken", data.token);
      setShow(true);
      navigate("/");

      return () => {
        abortController.abort();
      };

      setLoading(false);
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
      setLoading(false);
    }
    setEmail("");
    setPassword("");
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
                  className="fa fa-unlock-alt fa-lg"
                  style={{ color: "#04a9f5" }}
                />
              </div>
              <h3 className="mb-4">Sign In</h3>
              <form action="">
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
                {/*  */}
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
                  login
                </button>
              </form>
              <p className="mb-2 text-muted">
                Forgot password?
                <Link className="mx-1" to="/sendResetMail">
                  Reset
                </Link>
              </p>
              <p className="mb-0 text-muted">
                Don't have an account?{" "}
                <Link className="mx-1" to="/register">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
