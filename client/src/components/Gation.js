/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react'
import { animations } from "react-animation";
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Nav() {
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
      });

  }

  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    menuRef.current.classList.toggle("change");
    setIsOpen(!isOpen);
  }


 

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

{/* 
      <div className="container" onClick={handleClick} ref={menuRef}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div> */}
  

      {/* <nav style={{
		animation: animations.bounceIn,
		animationDuration: "0.8s",
	}}>
		<Link to='/'>
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
	</nav> */}


    <div id="menuArea">
  <input type="checkbox" id="menuToggle"></input>

<label for="menuToggle" className="menuOpen">
  <div className="open"></div>
</label>

<div className="menu menuEffects">
  <label for="menuToggle"></label>
  <div className="menuContent">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/swipe">Swipe</a></li>
      <li><a href="/matches">Matches {/* Match count */}</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </div>
</div>
</div>

    </div >
  )
}

export default Nav