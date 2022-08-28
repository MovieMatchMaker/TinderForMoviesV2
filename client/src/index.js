import React, {useEffect} from 'react';
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
import { Provider } from 'react-redux';
import store from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
// const store = configureStore({
//   matches: [
//     {
//       id: 1,
//       title: 'Toms movie',
//       overview: 'Hi Tom',
//       poster_path: 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg',
//       release_date: '2020-01-01',
//     }
//   ]
// });

function TinderMovies() {
  
  
  let persistor = persistStore(store);
  
  
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<><FourOhFour/><NavigatonBar/></>} />
                {["/","","/home"].map((path) => (
                  <Route key="Home" path={path} element={<><Home/><NavigatonBar/></>} />
                ))}
                <Route path="/login" element={<><Login/><NavigatonBar/></>}/>
                <Route path="/signup" element={<><Signup/><NavigatonBar/></>}/>
                <Route path='/logout' element={<><Logout/><NavigatonBar/></>}/>
                <Route element={<PrivateRoutes/>}>
                  <Route path="/matches" element={<><Matches/><NavigatonBar/></>}/>
                  <Route path="/swipe" element={<><Swipe/></>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TinderMovies />
);


