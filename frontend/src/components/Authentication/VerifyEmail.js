import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import parse from "html-react-parser";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const [msg, setMsg] = useState();
  const [result, setResult] = useState(false);
  useEffect(() => {
    const token = queryParameters.get("token");
    const email = queryParameters.get("email");
    if (!token || !email) {
      navigate("/login");
    }
    fetchData(token, email);
    // eslint-disable-next-line
  }, []);

  const fetchData = async (token, email) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/v1/auth/verify-email",
        { token, email },
        config
      );
      console.log(data);
      setMsg(data.msg);
      setResult(true);
    } catch (error) {
      console.log(error.response.data);
      setMsg(error.response.data.msg);
      setResult(false);
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
                {result
                  ? parse(
                      `<i class="fa fa-check fa-lg" style="color: #25c800e9; font-size: 4rem;"></i>`
                    )
                  : parse(
                      `<i class="fa fa-times fa-lg" style="color: rgb(200 23 0 / 91%); font-size: 4rem;"></i>`
                    )}
              </div>

              <h3 className="mb-4">{msg}</h3>

              {result
                ? parse(
                    `<p class="text-muted">Your Email is successfully verified . <a href="/login">Click Here</a> to login</p>`
                  )
                : parse(`<p className="text-muted text-capitalize">
            Something went wrong Please try again later !!!
          </p>`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
