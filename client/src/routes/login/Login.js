/* eslint-disable jsx-a11y/anchor-is-valid */

<<<<<<< HEAD
import React, { useState } from "react";
import "../../../src/styles/login.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { Link } from "react-router-dom";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../src/styles/login.css";
import { stringify } from "nodemon/lib/utils";

>>>>>>> main

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsernameL] = useState("");
  const [password, setPasswordL] = useState("");
  const [userL, setUserL] = useState({
    username: "",
    password: "",
  });

<<<<<<< HEAD
  const [message, setMessage] = useState("");
=======
	const [username, setUsername] = React.useState("");
	const [loginToken, setLoginToken] = useState(null);

	const getLoginToken = async () => {
	  	const response = await fetch("/api/login");
	  	const data = await response.text();
	  	console.log(data);
		setUsername(data.username);
		setLoginToken(data.text);
	};


	useEffect(() => {
		getLoginToken();
	}, [])



  return  (
>>>>>>> main

  const handleChangeU = (e) => {
    setUsernameL(e.target.value);
    setUserL({
      ...userL,
      username: e.target.value,
    });
  };

<<<<<<< HEAD
  const handleChangeP = (e) => {
    setPasswordL(e.target.value);
    setUserL({
      ...userL,
      password: e.target.value,
    });
  };
=======
    <div class="section">
		<div class="container">
			<div class="row full-height justify-content-center">
				<div class="col-12 text-center align-self-center py-5">
					<div class="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
			          	<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div class="card-3d-wrap mx-auto">
							<div class="card-3d-wrapper">
								<div class="card-front">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="mb-4 pb-3">Log In</h4>
											<div class="form-group">
												<input type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off"></input>
												<i class="input-icon uil uil-at"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off"></input>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
											<a href="#" class="btn mt-4">submit</a>
                            				<p class="mb-0 mt-4 text-center"><a href="#0" class="link">{username? loginToken : username}</a></p>
				      					</div>
			      					</div>
			      				</div>
								<div class="card-back">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="mb-4 pb-3">Sign Up</h4>
											<div class="form-group">
												<input type="text" name="logname" class="form-style" placeholder="Your Full Name" id="logname" autocomplete="off"></input>
												<i class="input-icon uil uil-user"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off"></input>
												<i class="input-icon uil uil-at"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off"></input>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
											<a href="#" class="btn mt-4">submit</a>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
>>>>>>> main

  const handleLogin = () => {
    const { username, password } = userL;
    console.log(username, password);
    if (username === "" || password === "" || password.length < 2) {
      setMessage("Fill out both fields before submitting!");
      return;
    }
    fetch(`/api/login`, {
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
		
        if (data.message === "Account not Found!") {
          setMessage(data.message);
          return;
        } else {
          setTimeout(() => {
            navigate("/swipe");
          }, 2000);
          setMessage(data.message);
        }
      });
  };

  return (
    <div>
      <a href="/home">
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
