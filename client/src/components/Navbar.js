import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ animationSetting }) {
	  const handleLogout = () => {
		  const token = localStorage.getItem("token");
      console.log(token);
		  fetch(`/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          localStorage.removeItem("token");
        })
        .catch((err) => {
          console.log(err);
        }
      );

	}

return (
	<nav style={{ animation: animationSetting, animationDuration: "0.5s" }}>
		<Link to='/home'>
			<h1 className='nav home'>Home</h1>
		</Link>

		<Link to='/swipe'>
			<h1 className='nav swipe'>Swipe</h1>
		</Link>

		<br>
		</br>

		<Link to='/matches'>
			<h1 className='nav matches'>Matches</h1>
		</Link>

		<Link to='/logout' onClick={handleLogout}>
			<h1 className='nav logout'>Logout</h1>
		</Link>
	</nav>
);
}


