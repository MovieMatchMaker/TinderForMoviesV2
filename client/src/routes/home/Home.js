import React from 'react'
import '../../styles/Home.css';
import {Link} from 'react-router-dom';
import { animations } from 'react-animation'
import 'react-animation/dist/keyframes.css';

function Home() {
  return (
    <div>
          <h1 style={{animation: animations.slideIn}} id="welcome-header">TinderForMovies</h1>

          <div id="welcome-text">

          </div>


          <Link to="/swiping">
            <button>Start Swiping!</button>
          </Link>
    </div>
  )
}

export default Home;