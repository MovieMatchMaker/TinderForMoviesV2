import React, { useState } from "react";
import "../../../src/styles/login.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsernameL] = useState("");
  const [password, setPasswordL] = useState("");
  const [userL, setUserL] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChangeU = (e) => {
    setUsernameL(e.target.value);
    setUserL({
      ...userL,
      username: e.target.value,
    });
  };

  const handleChangeP = (e) => {
    setPasswordL(e.target.value);
    setUserL({
      ...userL,
      password: e.target.value,
    });
  };

  const handleLogin = () => {
    const { username, password } = userL;
    console.log(username, password);
    if (username === "" || password === "" || password.length < 0) {
      setMessage("Fill out both fields before submitting!");
      return;
    } else {
      const token = localStorage.getItem("token");
    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 0) {
          setMessage(data.message);
          return;
        } else {
          setMessage(data.message);
          setTimeout(() => {
            localStorage.setItem("token", data.login_token);
            navigate("/swipe");
          }, 2000);
        }
      });
    }
  };

  return (
    <div>
      <a href="/">
        <h1
          style={{ animation: animations.bounceIn, animationDuration: "0.7s" }}
          id="logo"
        >
          <span className="ms">M</span>ovie<span className="ms">M</span>atch
          <span className="ms">M</span>aker
        </h1>
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
                    <i className="login-status">{message}</i>
                  </div>
                  <a href="#" onClick={handleLogin} className="btn mt-4">
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