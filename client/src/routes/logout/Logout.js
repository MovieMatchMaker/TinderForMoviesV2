import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/authSlice";

function Logout() {

  const dispatch = useDispatch();
  const seconds = 5;
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    localStorage.removeItem("token");
  
    if (timeLeft && window.location.pathname !== "/logout") {
      dispatch(logoutUser(null));
    }

    if (!timeLeft){
      dispatch(logoutUser(null));
      window.location.reload();
      navigate("/");
    } else if (!timeLeft&&window.location.pathname !== "/logout"){ 
      dispatch(logoutUser(null));
      return;
    }
    
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <div>
      <h1 style={{ color: "lightyellow" }}>You have logged out of MovieMatchMaker.</h1>
      <h1 style={{ color: "lightyellow" }}>If you'd like to see your matches again, log back in!</h1>
      <h1 style={{ color: "lightyellow" }}>This page will be redirected in {timeLeft} seconds....</h1>
      <br></br>
      <br></br>
      <Link to="/login">
        {/* <NavigationBar /> */}
        <button 
        className="bn29" 
        style={{ "fontSize": "1.5rem" }}
        onClick={() => dispatch(logoutUser(null))}
        >
          Log Back In
        </button>
      </Link>
    </div>
  );
}

export default Logout;
