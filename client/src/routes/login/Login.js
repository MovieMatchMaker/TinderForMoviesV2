/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../../src/styles/login.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserMatches } from "../../slices/authSlice";
import Spinner from "../../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChangeU = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const handleChangeP = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = user;
    setIsLoading(true);
    dispatch(loginUser({ username, password }))
    dispatch(getUserMatches(username));
    setMessage("");
    if (auth.loginStatus === "success" && auth.username) {
      setMessage(
        `Logged in! Welcome back, ${auth.username.replace(/(^\w|\s\w)/g, (m) =>
          m.toUpperCase()
        )}!`
      );
      setTimeout(() => {
        navigate("/swipe");
      }, 2000);
    } else if (auth.loginStatus === "pending") {
      setMessage(`${auth.loginError}`);
    } else if (auth.loginStatus === "rejected") {
      setMessage(`${auth.loginError}`);
    } else {
      setMessage(auth.loginError);
    }
    
  };

  useEffect(() => {
    setIsLoading(false);
  }, [auth.loginStatus]);

  return (
    <div>
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
              {isLoading === true ? <Spinner /> : null}
              <div className="center-wrap">
                <div className="section text-center">
                  <h4 className="mb-4 pb-3">Log In</h4>
                  <div className="form-group">
                    <form onSubmit={handleLogin}>
                      <input
                        type="text"
                        className="form-style"
                        placeholder="Username"
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
                        className="form-style"
                        placeholder="Password"
                        id="logpass"
                        onChange={handleChangeP}
                        autoComplete="off"
                      ></input>
                    </form>
                    <ul className="login-status">{message ? message : null}</ul>
                  </div>
                  <a
                    href="/"
                    onClick={(e) => handleLogin(e)}
                    className="btn mt-4"
                  >
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
