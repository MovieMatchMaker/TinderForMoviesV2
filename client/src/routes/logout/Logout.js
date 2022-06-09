import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <div>
      <h1 style={{ color: "lightgreen" }}>You have logged out.</h1>
      <h1 style={{ color: "lightgreen" }}>Hope you come again!</h1>
      <br></br>
      <br></br>
      <Link to="/login">
        <button className="bn29" style={{ "font-size": "1.5rem" }}>
          Log Back In
        </button>
      </Link>
    </div>
  );
}

export default Logout;
