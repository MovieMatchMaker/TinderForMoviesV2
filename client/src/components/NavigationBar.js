import React from 'react'
import { animations } from "react-animation";
import "../styles/Navbar.css";

function Nav() {
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
          <div id="menuArea">
        <input type="checkbox" id="menuToggle"></input>

      <label htmlFor="menuToggle" className="menuOpen">
        <div className="open"></div>
      </label>

      <div className="menu menuEffects">
        <label htmlFor="menuToggle"></label>
        <div className="menuContent">
          <ul>
            <li><a href="/home">Home</a></li>
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