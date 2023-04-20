import { useState } from "react";
import {  toast } from "react-toastify";
import axios from "axios";
import "./auth.css";

const SendResetMail = () => {
    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email ) {
      toast.warn("Email  must be required", {
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
        "/api/v1/auth/reset-password",
        { email },
        config
      );
      console.log(data);

      toast.success("Reset link send successfully", {
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
    setEmail("");
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
              <i className="fa fa-envelope fa-lg" style={{ color: "#04a9f5" }} />
            </div>
            <h3 className="mb-4">Generate Reset Link</h3>
            <p className="text-muted">
              Enter the email address associated with your account and we will
              send you a link to reset password
            </p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}} />
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
                  Send Mail
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default SendResetMail
