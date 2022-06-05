import React from 'react'
import "../../styles/Matches.css";

function Matches() {

      const atches = ["tom","danny","artem"];

  return (
      <div>
              <h3>Matches</h3>
            {atches.map(match => <h1>{match}</h1>)}
      </div>
      )
}
export default Matches;