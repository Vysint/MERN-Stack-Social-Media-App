import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import Logo from "../../img/logo.png";

import "./Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    // Left side (logo)
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Vintage Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account Sign up!"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
