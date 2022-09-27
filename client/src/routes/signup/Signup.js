/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../src/styles/login.css";
import { useState, useEffect } from "react";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";


export default function Signup() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    matches: [],
  });


  const [message, setMessage] = useState("");

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

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, password } = user;
    if (username === "" || password === "") {
      setMessage("Please fill out all fields");
    } else {
      dispatch(registerUser(user));

      if (auth.registerStatus === "success") {
        setMessage(`Welcome ${auth.username}!`);
        setTimeout(() => {
          navigate("/swipe");
        } , 2000);
      } else {
        setMessage(`${auth.registerError}`);
      }
    }

  };

  useEffect(() => {
    if (auth._id) {
      setMessage("You are already logged in");
      setTimeout(() => {
        navigate("/swipe");
      } , 2000);
    }
  } , []);
    

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
                    <h4 className="mb-4 pb-3">Sign Up</h4>
                    <div className="form-group mt-2">
                      <form onSubmit={handleSignup}>
                        <input
                          type="text"
                          username="logemail"
                          className="form-style"
                          onChange={handleChangeU}
                          placeholder="New Username"
                          id="logemail2"
                          autoComplete="off"
                          ></input>
                        </form>
                      <i className="signup-status">
                        {
                          message ? message.replace(/(^\w|\s\w)/g, m => m.toUpperCase()): null
                        }
                      </i>
                    </div>
                    <div className="form-group mt-2">
                      <form onSubmit={handleSignup}>
                        <input
                          type="password"
                          username="logpass"
                          className="form-style"
                          onChange={handleChangeP}
                          placeholder="New Password"
                          id="logpass2"
                          autoComplete="off"
                          ></input>
                        </form>
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <a id='submit-a-text' onClick={handleSignup} href="#" className="btn mt-4">
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
}