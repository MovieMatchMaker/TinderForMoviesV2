import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Login from './routes/login/Login';
import Home from "./routes/home/Home";
import Matches from './routes/matches/Matches';
import Swiping from "./routes/swiping/Swiping";
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

function TinderMovies() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Home/></>}/>
          <Route path="/home" element={<><Home/></>}/>
          <Route path="/swiping" element={<><Swiping/></>}/>
          <Route path="/login" element={<><Login/></>}/>
          <Route path="/matches" element={<><Matches/></>}/>
          {/* <Route path="/404" element={<><FourOhFour></>}/> */}
        </Routes>
      </BrowserRouter>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TinderMovies/>
  </React.StrictMode>
);


