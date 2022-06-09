/* eslint-disable jsx-a11y/heading-has-content */
import "../styles/Cards.css";
import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { axios } from "axios";


export default function Cards() {

	const db = [{
			name: 'Richard Hendricks',
			url: 'https://picsum.photos/200/300'
		},
		{
			name: 'Erlich Bachman',
			url: 'https://picsum.photos/200/300'
		},
		{
			name: 'Monica Hall',
			url: 'https://picsum.photos/200/300'
		},
		{
			name: 'Jared Dunn',
			url: 'https://picsum.photos/200/300'
		},
		{
			name: 'Dinesh Chugtai',
			url: 'https://picsum.photos/200/300'
		}
	]

	const movies= [];
  const [lastDirection, setLastDirection] = useState()
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

const getPopularMovies = async () => {
	const response = await fetch("/api/matching/get_current", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token: localStorage.getItem("token"),
		}),
	});
	const data = await response.json();
	movies.push(data.current_movie.title);
	console.log(movies);
	console.log(movies[0].current_movie);

};

	  useEffect(() => {
		  getPopularMovies();
	  }, []);

	  const characters = db;


  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>{movies[0]}</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}


// 	const getPopularMovies = async () => {
// 		const response = await fetch("/api/matching/get_current", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				token: localStorage.getItem("token"),
// 			}),
// 		});
// 		const data = await response.json();
// 		setMovie(data);
// 	};

// 	const db = moviePosters;
// 	const [currentIndex, setCurrentIndex] = useState(db.length - 1);
// 	const [lastDirection, setLastDirection] = useState();
// 	// used for outOfFrame closure
// 	const currentIndexRef = useRef(currentIndex);

// 	const childRefs = useMemo(() => {
// 		const childRefs = [];
// 		for (let i = 0; i < db.length; i++) {
// 			childRefs.push(React.createRef());
// 		}
// 		return childRefs;
// 	}, [db.length]);

// 	const updateCurrentIndex = (val) => {
// 		setCurrentIndex(val);
// 		currentIndexRef.current = val;
// 	};

// 	//const canGoBack = currentIndex < db.length - 1;

// 	const canSwipe = currentIndex >= 0;

// 	// set last direction and decrease current index
// 	const swiped = (direction, nameToDelete, index) => {
// 		setLastDirection(direction);
// 		updateCurrentIndex(index - 1);
// 	};

// 	const outOfFrame = (name, idx) => {
// 		console.log(
// 			`${name} (${idx}) left the screen!`,
// 			currentIndexRef.current
// 		);
// 		// handle the case in which go back is pressed before card goes outOfFrame
// 		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
// 		// TODO: when quickly swipe and restore multiple times the same card,
// 		// it happens multiple outOfFrame events are queued and the card disappear
// 		// during latest swipes. Only the last outOfFrame event should be considered valid
// 	};

// 	const swipe = async (dir) => {
// 		if (canSwipe && currentIndex < db.length) {
// 			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
// 		}

// 		if (dir === "right") {
			
// 		}


// 	};


// 	const matchHandle = async () => {
// 		const response = await fetch("/api/matching/match", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				token: localStorage.getItem("login_token"),
// 			}),
// 		});

// 		const data = await response.json();
// 		console.log(data.data.results);
// 		if (data.status === 1) {
// 			const obj = JSON.parse(JSON.stringify(data.data.results));
// 			setWatchProviders(data.data);
// 		}

// 	}



// 	useEffect(() => {
// 		getPopularMovies();
// 	}, []);

// 	return (
// 		<div>
// 			<br></br>
// 			<br></br>
// 				<div className='cardContainer'>

// 					{db.map((movie, index) => (
// 					<TinderCard
// 						ref={childRefs[index]}
// 						className='swipe'
// 						key={movie.title}
// 						onSwipe={(dir) => swiped(dir, movie.title, index)}
// 						onCardLeftScreen={() => outOfFrame(movie.title, index)}>
// 						<div
// 							style={{
// 								backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`,
// 								animation: animations.popIn,
// 								animationDuration: "0.5s",
// 							}}
// 							className='card'>
// 							<h3>{movie.title}</h3>
// 						</div>
// 					</TinderCard>
// 				))}

				
// 				</div>
// 			<div>
// 				<button className="button-29"
// 					style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
// 					onClick={() => swipe("left")}>
// 					Swipe left!
// 	</button>
// 	<button className="button-29"
// 	onClick={() => matchHandle()}>
// 	    Match!
//         </button>
// 				<button className="button-29"
// 					onClick={() => swipe("right")}>
// 					Swipe right!
// 				</button>
// 			</div>
// 			{lastDirection ? (
// 				<h2 key={lastDirection} className='infoText'>
// 					You swiped {lastDirection}
// 				</h2>
// 			) : (
// 				<h2 className='infoText'>
// 					{/* Swipe a card or press a button to get Restore Card button visible! */}
// 				</h2>
// 			)}
// 		</div>
// 	);
// }


