import React from "react";
import "../../styles/Matches.css";
import { useEffect, useState } from "react";

function Matches() {
  var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
  };
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const response = await fetch("/api/matches");
    const data = await response.json();
    console.log(data.results);
    setMatches(data.results);
  };

  const mapMatches = matches.map((match) => {
    return (
      <div className="container">
              <img
                className="image"
                src={`https://image.tmdb.org/t/p/w500${match.poster_path}`}
                alt=""
              />
            <div className="overlay">
              <p className="text-release">
                {new Date(match.release_date).toLocaleDateString("en-US", options)}
              </p>
              <h2 className="text-title">{match.title}</h2>
              <p className="text-overview">{match.overview}</p>
          </div>
      </div>
  );});

  const noMatches = () => {
    return (
      <div className="no-matches">
        <h1>No matches found</h1>
      </div>
    );
  }

 
  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div>
      <h1>Matches ({matches.length})</h1>
      <div className="viewport">
        <ul className="list">
          {matches.length > 0 ? mapMatches : noMatches()}
        </ul>
      </div>
    </div>
  );
}
export default Matches;
