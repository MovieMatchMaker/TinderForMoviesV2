/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../src/styles/login.css";
import { useState } from "react";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChangeU = (e) => {
    setUsername(e.target.value);
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const handleChangeP = (e) => {
    setPassword(e.target.value);
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleSignup = () => {
    const { username, password } = user;
    if (username === "" || password === "") {
      setMessage("Please fill out all fields");
    } else {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 1) {
            setMessage(data.message);
            setTimeout(() => {
              localStorage.removeItem("token");
              localStorage.setItem("token", data.login_token);
              navigate("/");
            }, 5000);
          } else {
            setMessage(data.message);
          }
        }
        );
      }
  };

  return (
    <div>
      <a href="/">
        
      </a>
      <Link to="/login">
        <div
          style={{ animation: animations.bounceIn, bottom: "50px" }}
          className="bn29 signup"
        >
          Log In
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
                  <form action="#" autoComplete="off">
                    <h4 className="mb-4 pb-3">Sign Up</h4>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        username="logemail"
                        className="form-style"
                        defaultValue={username}
                        onChange={handleChangeU}
                        placeholder="New Username"
                        id="logemail2"
                        autoComplete="off"
                      ></input>
                      <i className="signup-status">{message}</i>
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="password"
                        username="logpass"
                        className="form-style"
                        defaultValue={password}
                        onChange={handleChangeP}
                        placeholder="New Password"
                        id="logpass2"
                        autoComplete="off"
                      ></input>
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <a onClick={handleSignup} href="#" className="btn mt-4">
                      submit
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


