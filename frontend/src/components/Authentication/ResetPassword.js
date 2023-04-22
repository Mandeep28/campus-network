import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "./auth.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
useEffect(()=>{
  const token = queryParameters.get("token");
  const email = queryParameters.get("email");
  if(!token || !email) {
      navigate("/login");
  }
  // eslint-disable-next-line
},[]);



  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

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
    console.log( password, confirmpassword);

    if ( !password || !confirmpassword ) {
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
      const token = queryParameters.get("token");
      const email = queryParameters.get("email");
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/v1/auth/forgot-password",
        {  email, password,token },
        config
      );
      console.log(data);

      toast.warn("Password reset successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setConfirmpassword("");
      setPassword("");

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
      setConfirmpassword("");
      setPassword("");
      setLoading(false);
    }
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
                {/* <i class="fa fa-unlock-alt"></i> */}
                <i className="fa fa-lock fa-lg" style={{ color: "#04a9f5" }} />
              </div>
              <h3 className="mb-4">Reset Password</h3>
              <div className="input-group mb-4 border border-1 ">
                <input
                  type="password"
                  className="form-control border-none"
                  style={{ outline: "none", border: "none" }}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
                <i className="m-auto mx-1 fa fa-eye" onClick={showHide} />
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
                  className={loading ? "spinner-border spinner-border-sm" : ""}
                ></span>{" "}
                Reset Passoword
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
