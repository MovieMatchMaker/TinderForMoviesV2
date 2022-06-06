import React from 'react'
import '../../styles/Home.css';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
          <h1 id="welcome-header">Welcome to  our App!</h1>

          <div id="welcome-text">

            <p>
              TinderForMovies is a web application that allows you to swipe right or left on movies to see if you like them.
            </p>

            <p>
              You can also see the movies you have swiped on and the movies you have swiped left on.
            </p>

            <p>
              Swipe left on a movie if you don't like it, and swipe right if you do.
            </p>

          </div>


          <Link to="/swiping">
            <button>Start Swiping!</button>
          </Link>
    </div>
  )
}

export default Home;