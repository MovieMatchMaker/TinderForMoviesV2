import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ animationSetting }) {
	return (
		<nav style={{ animation: animationSetting, animationDuration: "0.5s" }}>
			<Link to='/home'>
				<h1 className='nav home'>Home</h1>
			</Link>

			<Link to='/swipe'>
				<h1 className='nav swipe'>Swipe</h1>
			</Link>

			<Link to='/matches'>
				<h1 className='nav matches'>Matches</h1>
			</Link>

			<Link to='/logout'>
				<h1 className='nav logout'>Logout</h1>
			</Link>
		</nav>
	);
}

export default Navbar;
