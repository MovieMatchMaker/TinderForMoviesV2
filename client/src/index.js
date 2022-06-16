import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Login from './routes/login/Login';
import Home from "./routes/home/Home";
import Navbar from './components/Navbar';
import FourOhFour from './routes/404/FourOhFour';
import {animations} from 'react-animation'
import Signup from './routes/signup/Signup';
import Logout from './routes/logout/Logout';
import Matches from './routes/matches/Matches';
import Swipe from './routes/swipe/Swipe';


function TinderMovies() {
    const isLoggedIn = localStorage.getItem("token") !== undefined;

    

    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<><FourOhFour/><Navbar animationSetting={animations.bounceIn}/></>} />
          <Route path="/" element={<><Home/></>}/>
          <Route path="/home" element={<><Home/></>}/>
          <Route path="/swipe" element={<><Swipe/><Navbar animationSetting={animations.popIn}/></>}/>
          <Route path="/login" element={<><Login/></>}/>
          <Route path="/signup" element={<><Signup/></>}/>
          <Route path="/matches" element={<><Matches/><Navbar animationSetting={animations.bounceIn}/></>}/>
          <Route path='/logout' element={<><Logout/></>}/>
        </Routes>
      </BrowserRouter>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TinderMovies />
  </React.StrictMode>
);


