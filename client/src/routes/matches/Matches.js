import React from 'react'
import "../../styles/Matches.css";
import { useEffect, useState } from "react";

function Matches() {

      const [matches, setMatches] = useState([]);
      
      const getMatches = async () => {
            const response = await fetch("/api/matches");
            const data = await response.json();
            console.log(data.results);
            setMatches(data.results);
      }

      useEffect(() => {
            getMatches();
      }, []);


  return (
      <div>
            <h1>Matches</h1>
            <div className='match-container'>


                  {matches.map((match, index) => {
                        return (
                              <div id='match' key={index}>
                                    <ul>
                                          <li>
                                                <h3 id='match-title'>{match.title}</h3> <h3 id="match-release">{new Date(match.release_date).toLocaleDateString(
                                          "en-US",
                                          {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                          }
                                    )}</h3>
                                                <img id="match-img" src={`https://image.tmdb.org/t/p/w200${match.poster_path}`} alt=""/>                                    
                                          </li>

                                    </ul>
                              </div>
                        )
                  })}

                  
            </div>
      </div>
      )
}
export default Matches;