import React, { useEffect, useState } from "react";
import "../../../src/styles/login.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [username, setUsernameL] = useState("");
  const [password, setPasswordL] = useState("");
  const [userL, setUserL] = useState({
    username: "",
    password: "",
  });

  
  const [message, setMessage] = useState("");
  
  const handleChangeU = (e) => {
    setUserL({
      ...userL,
      username: e.target.value,
    });
  };
  
  const handleChangeP = (e) => {
    setUserL({
      ...userL,
      password: e.target.value,
    });
  };

 
  
  
  const handleLogin = (e) => {
    const { username, password } = userL;
    
    if (username === "" || password === "" || password.length < 0 || username.length < 0) {
      setMessage("Fill out both fields before submitting!");
      return;
    } else {
      e.preventDefault();
      dispatch(loginUser(userL));
      if (auth.loginStatus === "success") {  
        setMessage(`Logged in! Welcome back! ${auth.username}`);
        setTimeout(() => {
          navigate("/swipe");
        } , 2000);
      } else {
        //setMessage("Invalid username or password.");
        return;
      }
    }
  };

  return (
    <div>
      <a href="/">
        
      </a>

      <Link to="/signup">
        <div
          style={{ animation: animations.bounceIn, bottom: "50px" }}
          className="bn29 signup"
        >
          Sign Up
        </div>
      </Link>
      <div
        style={{ animation: animations.bounceIn, animationDuration: "0.7s" }}
        className="section"
      >
        <label htmlFor="reg-log"></label>
        <div className="card-3d-wrap mx-auto">
          <div className="card-3d-wrapper">
            <div className="card-front">
              <div className="center-wrap">
                <div className="section text-center">
                  <h4 className="mb-4 pb-3">Log In</h4>
                  <div className="form-group">
                    <form>
                      <input
                        type="text"
                        username="logemail"
                        className="form-style"
                        placeholder="Username"
                        defaultValue={username}
                        onChange={handleChangeU}
                        id="logemail"
                        autoComplete="off"
                      ></input>
                    </form>
                    <i className="input-icon uil uil-at"></i>
                  </div>
                  <div className="form-group mt-2">
                    <form onSubmit={handleLogin}>
                      <input
                        type="password"
                        username="logpass"
                        className="form-style"
                        placeholder="Password"
                        id="logpass"
                        defaultValue={password}
                        onChange={handleChangeP}
                        autoComplete="off"
                      ></input>
                    </form>
                    <i className="login-status">
                    {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
                    {message ? <p>{message}</p> : null}
                    </i>
                  </div>
                  <a href="f" onClick={handleLogin} className="btn mt-4">
                    submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;