import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, deleteAllMatches } from "../../slices/authSlice";

function Logout() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const seconds = 5;
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {

    if (auth._id) {
      // let obj = {}
      // obj.username = auth.username;
      // dispatch(deleteAllMatches(obj))
      console.log("deleted all matches")
      dispatch(logoutUser(null));
      console.log("logged out")
      navigate("/");
      localStorage.removeItem("token");
    } 
    if (!timeLeft){
      dispatch(logoutUser(null));
      navigate("/home");
    } else if (!timeLeft&&window.location.pathname !== "/logout"){ 
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
        <button className="bn29" style={{ "fontSize": "1.5rem" }}>
          Log Back In
        </button>
      </Link>
    </div>
  );
}

export default Logout;
