import axios from "axios";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Cards.css";
import { useNavigate } from "react-router-dom";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import Nav from "./NavigationBar";
import icon from "../utils/icon";
// import Spinner from './Spinner';
import { useDispatch, useSelector } from "react-redux";
import { addMatch, saveMatch, selectMatches } from "../slices/authSlice";
// import { addMatch, selectMatches } from "../reducers/matchesReducer";
import ReactCanvasConfetti from "react-canvas-confetti";
// import confetti from "canvas-confetti"


function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
  }
  
  const canvasStyles = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0
  };
  
  function getAnimationSettings(originXA, originXB, setParticleCount) {
	return {
	  startVelocity: 30,
	  spread: 360,
	  ticks: 60,
	  zIndex: 0,
	  particleCount: setParticleCount,
	  origin: {
		x: randomInRange(originXA, originXB),
		y: Math.random() - 0.2
	  }
	};
  }


export default function Cards() {

	const navigate = useNavigate();

	const [db, setDb] = useState([]);
	const [isActive, setActive] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(db.length);
	const currentIndexRef = useRef(currentIndex);


	// Redux Stuff
	const matches = useSelector(selectMatches);

	const dispatch = useDispatch();
	const username = useSelector((state) => state.auth.username);

	const childRefs = useMemo(() => {
		const refs = [];
		for (let i = 0; i < db.length; i++) {
			refs.push(React.createRef());
		}
		return refs;
	}, [db]);

	const iconRef = useRef(null);

	const toggleFront = () => {
		iconRef.current.classList.toggle("hidden");
		setActive(!isActive);
	};

	const toggleBack = () => {
		iconRef.current.classList.toggle("show");
		setActive(!isActive);
	};

	const getAny = async () => {
		const response = await axios.get("/api")
		const append = response.data;
		const newDb = [...db, append];
		setDb(newDb);
	};

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	if (localStorage.getItem("token") === null) {
		navigate("/home");
	}
	

	const renderCurrentMovie = async (id) => {
		//document.getElementById("hidden").style.visibility = "hidden";
		const token = localStorage.getItem("token");
		if (token === null) {
			navigate("/logout");
		}

		await axios
			.post("/api/get_movie", {
				id: id,
			})
			.then((response) => {
				if (response){
					const copy = [...db];
					copy.push(response.data)
					setDb([...copy])
				} else {
					// console.error("Error: ", response.data.message);
					navigate("/logout");
					// navigate("/logout") or handle this 
				}
			})
			.catch((err) => {
				console.error(err);
			});

	};


	const serveNextMovie = async (id, direction) => {
		const token = localStorage.getItem("token");
		if (token === null) {
			navigate("/logout");
		}

		console.info(" Serving next movie.\n Previous was: \n", db[db.length - 1].title);

		if (direction === "right") {
			await axios
				.post("/api/get_movie", {
					id: id,
				})
				.then((response) => {
					const copy = [...db];
					copy.push(response.data);
					setDb([...copy]);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			await axios
				.post("/api/get_movie", {
					id: id,
				})
				.then((response) => {
					const copy = [...db];
					copy.push(response.data);
					setDb([...copy]);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const movies = db;
	const [lastDirection, setLastDirection] = useState();

	// Swipe w/o buttons.
	const swiped = async (direction, nameToDelete, index) => {

		setLastDirection(direction);
		//console.info("Last direction was: " + lastDirection);

		if (direction === "left" ) {
			// show a new set of movies
			await serveNextMovie(db[db.length - 1].id, direction).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
		} else if (direction === "right") {
			// keep the same set of movies / reccomend more
			await serveNextMovie(db[db.length - 1].id, direction).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
		} else if (direction === "right") {
			// add to matches list, show more movies like matched movie
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
			console.info("Swiped up or down");
		}
	};

	const outOfFrame = (title) => {
		// console.log(title + " left the screen!");
	};

	//TODO: Add go back to previous movie functionality
	// const canGoBack = currentIndexRef.current > 0;
	// console.log(canGoBack);

	// const goBack = async  () => {
	// 	if (canGoBack) {
	// 		updateCurrentIndex(currentIndexRef.current - 1);
	// 		await childRefs[currentIndexRef.current].current.restoreCard();
	// 	} else {
	// 		return;
	// 		console.log("Can't go back anymore!");
	// 	}
	// }

	const refAnimationInstance = useRef(null);
	const [intervalId, setIntervalId] = useState();
  
	const getInstance = useCallback((instance) => {
	  refAnimationInstance.current = instance;
	}, []);
    
	const startAnimation = useCallback(() => {
	  if (!intervalId) {
		var duration = 10 * 1000;		//animation lasts 10 seconds
		var animationEnd = Date.now() + duration;
		
		var interval = setInterval(function() {
			var timeLeft = animationEnd - Date.now();
			if (timeLeft <= 0) {
				return clearInterval(interval);
			}
			var particleCount = 50 * (timeLeft / duration);
			refAnimationInstance.current(getAnimationSettings(0.1, 0.3, particleCount));
			refAnimationInstance.current(getAnimationSettings(0.7, 0.9, particleCount));

	  }, 250);
	}});

	//have this function just in case for testing
	const stopAnimation = useCallback(() => {
	  clearInterval(intervalId);
	  setIntervalId(null);
	  refAnimationInstance.current && refAnimationInstance.current.reset();
	}, [intervalId]);
  
	useEffect(() => {
	  return () => {
		clearInterval(intervalId);
	  };
	}, [intervalId]);
  
	const swipe = async (dir, index, isMatch) => {
		setLastDirection(dir);
		console.info("Last direction was: " + dir);

		if (isMatch) {
			// Add to matches list
			console.info(" New Match: \n", Array.from(db)[db.length - 1].title);
			dispatch(addMatch(db[index]));

			// start canvas confetti animation
			startAnimation();

			// here, we will also need to add a pop up (that should be of a same size as a card) that shows 'congrats' 
			// message to the user, something like: "Congrats you've matched with the movie, you can watch it here"
			
			let curr = db[index];
			// assign a var an object with the username and the movie object
			let obj = {};
			obj.username = username;
			obj.match = curr;
			console.log(obj);
			dispatch(saveMatch(obj));


			// setTimeout(fun => {
			// 	document.getElementById("hidden").style.visibility = "visible";
			// },1000)

			// await getMatchMovie().catch((err) => {
			// 	console.error(err);
			// });

			updateCurrentIndex(index + 1);

			childRefs[currentIndex].current.swipe(dir)

			// setTimeout(fun => {
			renderCurrentMovie(db[db.length - 1].id);
			// },3000);
		}

		if (dir === "left") {
			// show a new set of movies
		} else if (dir === "right") {
			// keep the same set of movies / reccomend more
		} else if (dir === "right" && isMatch) {
			// add to matches list, show more movies like matched movie
			// TODO: make the ui change in some way
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
		}
	};

	const parseText = (text) => {
		let max = 60;
		if (text.length < 1){
			return "No description provided :( "
		}
		let words = text.split(" ");

		if (words.length < max) {
			return text;
		} else {
			return words.slice(0, max).join(" ") + "...";
		}
	}

	useEffect(() => {
		renderCurrentMovie();
	}, []);

	return  (
		<div>
			<link
				href='https://fonts.googleapis.com/css?family=Damion&display=swap'
				rel='stylesheet'
			/>
			<link
				href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
				rel='stylesheet'
			/>
			<Nav />
			<div className='cardContainer'>
				{movies.map((movie, index) => (
					<TinderCard
						className='swipe'
						key={index}
						onSwipe={(dir) => swiped(dir, movie.title, index)}
						onCardLeftScreen={() => outOfFrame(movie.title)}
						ref={childRefs[index]}>
						<div
							className='flip-card'
							style={{
								animation: animations.fadeInUp,
								animationDuration: "0.5s",
							}}>
							<div
								className={
									isActive
										? "flip-card-inner"
										: "flip-card-inner spin"
								}>
								<div
									className='card flip-card-front'
									style={{
										backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`,
									}}>
									<div
										className='back-img'
										onClick={() => {
											toggleFront();
										}}>
										<img
											ref={iconRef}
											src={icon}
											alt='icon'
										/>
									</div>
									<h3>{movie.title}</h3>
								</div>
								<div className='flip-card-back'>
									<div className='back-img'>
										<img
											src={icon}
											alt='icon'
											onClick={() => {
												toggleBack();
											}}
										/>
									</div>
									<h1 className='back-title'>
										{movie.title}
									</h1>
									<h1 className='back-overview'>
										{parseText(movie.overview)}
									</h1>
								</div>
							</div>
						</div>
					</TinderCard>
				))}
			</div>
			
			<div className='buttons'>
				{/* <button
					className='bn39'
					onClick={() => swipe("left", currentIndex, false) && !isActive ? toggleFront() : null}>
					<span className='bn39span'>⬅️ Swipe Left</span>
				</button>
				<button
					className='bn39'
					onClick={() => swipe("right", currentIndex, true) && !isActive ? toggleFront() : null}>
					<span className='bn39span'>Match ⭐</span>
				</button>
				<button
					className='bn39'
					onClick={() => swipe("right", currentIndex, false) && !isActive ? toggleFront() : null}>
					<span className='bn39span'>Swipe Right ➡️</span>
				</button> */}
				<button 
					className="bn632-hover bn27"
					onClick={() => swipe("left", currentIndex, false) && !isActive ? toggleFront() : null}>
					⬅️ Swipe Left
				</button>
				<button 
					className="bn632-hover bn27"
					onClick={() => swipe("right", currentIndex, true) && !isActive ? toggleFront() : null}>
					Match ⭐
				</button>
				<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
				<button 
					className="bn632-hover bn27"
					onClick={() => swipe("right", currentIndex, false) && !isActive ? toggleFront() : null}>
					Swipe Right ➡️
				</button>
			</div>
		</div>
	);
}