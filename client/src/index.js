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
// import Navbar from './components/Navbar';
import FourOhFour from './routes/404/FourOhFour';
import Signup from './routes/signup/Signup';
import Logout from './routes/logout/Logout';
import Matches from './routes/matches/Matches';
import Swipe from './routes/swipe/Swipe';
import NavigatonBar from './components/NavigationBar';
import { PrivateRoutes } from './routes/private/PrivateRoute';

// Redux Stuff
// import {configureStore} from '@reduxjs/toolkit';
// import {Provider} from 'react-redux';

// const store = configureStore();



function TinderMovies() {

    return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/matches" element={<><Matches/><NavigatonBar/></>}/>
            <Route path="/swipe" element={<><Swipe/></>}/>
          </Route>
          <Route path="*" element={<><FourOhFour/><NavigatonBar/></>} />
          {["/","","/home"].map((path) => (
            <Route key="Home" path={path} element={<><Home/><NavigatonBar/></>} />
          ))}
          <Route path="/login" element={<><Login/><NavigatonBar/></>}/>
          <Route path="/signup" element={<><Signup/><NavigatonBar/></>}/>
          <Route path='/logout' element={<><Logout/><NavigatonBar/></>}/>
        </Routes>
      </BrowserRouter>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TinderMovies />
);


