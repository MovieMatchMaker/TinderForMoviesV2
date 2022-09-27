import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Login from './routes/login/Login';
import Home from "./routes/home/Home";
import FourOhFour from './routes/404/FourOhFour';
import Signup from './routes/signup/Signup';
import Logout from './routes/logout/Logout';
import Matches from './routes/matches/Matches';
import Swipe from './routes/swipe/Swipe';
import NavigatonBar from './components/NavigationBar';
import { PrivateRoutes } from './routes/private/PrivateRoute';

// Redux Stuff
import store from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider} from "react-redux";

function MovieMatchMaker() {
  let persistor = persistStore(store);
    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<><FourOhFour/><NavigatonBar/></>} />
                {["/","","/home"].map((path) => (
                  <Route key="Home" path={path} element={<><Home/></>} />
                ))}
                <Route path="/login" element={<><Login/><NavigatonBar/></>}/>
                <Route path="/signup" element={<><Signup/><NavigatonBar/></>}/>
                <Route path='/logout' element={<><Logout/></>}/>
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
    <MovieMatchMaker />
);


