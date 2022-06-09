import React from 'react'
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { animations } from 'react-animation'
import 'react-animation/dist/keyframes.css';


function Navbar() {
  return (
    <nav style={{animation: animations.slideIn}} >
      <Link to="/home">
            <h1 class="nav home">Home</h1>
      </Link>

      <Link to="/swiping">
            <h1 class="nav swiping">Swiping</h1>
      </Link>

      <Link to="/matches">
            <h1  class="nav matches">Matches</h1>
      </Link>

      <Link to="/logout">
            <h1 class="nav logout">Logout</h1>
      </Link>
    </nav>
  )

}

export default Navbar