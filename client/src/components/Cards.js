import axios from "axios";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Cards.css";
import { useNavigate } from "react-router-dom";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import Nav from "./NavigationBar";
import icon from "../utils/icon";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, addSeen, saveMatch, setNewSeenMovie, initLogin} from "../slices/authSlice";
import ReactCanvasConfetti from "react-canvas-confetti";

import introJs from "intro.js";

var intro = introJs();


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
	const id = useRef(0)
	const [isActive, setActive] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(db.length);
	const currentIndexRef = useRef(currentIndex);

	const dispatch = useDispatch();
	const username = useSelector((state) => state.auth.username);
	const initLoginState = useSelector((state) => state.auth.initLogin);
	

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

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	if (localStorage.getItem("token") === null) {
		navigate("/home");
	}
	

	const renderCurrentMovie = async (id) => {
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
					navigate("/logout");
				}
			})
			.catch((err) => {
				console.error(err);
			});

	};


	const serveNextMovie = async (id, direction, username) => {
		const token = localStorage.getItem("token");
		if (token === null) {
			navigate("/logout");
		}

		console.info(" Serving next movie.\n Previous was: \n", db[db.length - 1].title);

		if (direction === "right") {
			await axios
				.post("/api/swipe_right", {
					username: username,
					id: db[db.length - 1].id,
					genres: db[db.length - 1].genre_ids,
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
				.post("/api/swipe_left", {
					username: username,
					id: db[db.length - 1].id,
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

	// Swipe w/o buttons.
	const swiped = async (direction, nameToDelete, index) => {

		let request = {};
		request.id = db[index].id
		request.username = username;

		dispatch(addSeen(request));	


		if (direction === "left" ) {
			// show a new set of movies
			await serveNextMovie(db[db.length - 1].id, direction, username).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
		} else if (direction === "right") {
			// keep the same set of movies / reccomend more
			await serveNextMovie(db[db.length - 1].id, direction, username).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
		} else if (direction === "right") {
			// add to matches list, show more movies like matched movie
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
			console.info("Swiped up or down");
		}

		dispatch(setNewSeenMovie(db[index].id));

		
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
    
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
		console.info("Last direction was: " + dir);

			

		if (isMatch) {
			// Add to matches list
			console.info(" New Match: \n", Array.from(db)[db.length - 1].title);
			dispatch(addMatch(db[index]));
			console.log("db[index]", db[index].id)

			// here, we will add a pop up that shows 'congrats' message to the user
			handleConfirmationBox();

			// start canvas confetti animation
			startAnimation();

			let curr = db[index];
			// assign a var an object with the username and the movie object
			let obj = {};
			obj.username = username;
			obj.match = curr;
			console.log(obj);
			dispatch(saveMatch(obj));

			id.value = db[index].id

			updateCurrentIndex(index + 1);

			childRefs[currentIndex].current.swipe(dir)

			// setTimeout(fun => {
			renderCurrentMovie(db[db.length - 1].id);
			// },3000);
		}

		if (dir === "left") {
			childRefs[currentIndex].current.swipe(dir)
			await serveNextMovie(db[db.length - 1].id, dir, username).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
			
		} else if (dir === "right") {
			childRefs[currentIndex].current.swipe(dir)
			await serveNextMovie(db[db.length - 1].id, dir, username).catch((err) => {
				console.error(err);
			});
			updateCurrentIndex(index + 1);
		} else {
			childRefs[currentIndex].current.swipe(dir)
			await serveNextMovie(db[db.length - 1].id, dir, username).catch((err) => {
				console.error(err);
			}
			);
			updateCurrentIndex(index + 1);
		}
		
	};


	const [isCongratsShown, setIsCongratsShown] = useState(false)
	
	const handleConfirmationBox = () => {
		if (!isCongratsShown) {
			// document.querySelector(".congrats-bg").style.opacity = "0.55"
			// document.querySelector(".congrats-bg").style.transition = "0.5s ease-in"
			document.querySelector(".congrats-bg").style.display = "flex"
			document.querySelector(".congrats-container").style.display = "flex"
			
			stopAnimation()				//stop confetti animation
			setIsCongratsShown(true)
		} else {
			document.querySelector(".congrats-bg").style.display = "none"
			document.querySelector(".congrats-container").style.display = "none"
			stopAnimation()
			setIsCongratsShown(false)
		}
	}

	const parseText = (text) => {
		if (text.length < 1){
			return "No description provided 😢"
		}

		const max = 250;
		if (text.length <= max) { 
			return text; 				//if string is less than 400 chars
		}
		let subString = text.slice(0, max-1); // the original check
		subString.slice(0, subString.lastIndexOf(" "));
		if (subString[subString.length-1] === ","){
			subString[subString.length-1] = ""
		}
		
		return subString + "...";
	}

	useEffect(() => {
		window.scrollTo(0,0);
		renderCurrentMovie();
		document.body.style.overflow = "hidden";

		if (initLoginState) {
			setTimeout(() => {
					intro.setOptions({
						steps: [
							{
								element: '#movie-card',
								intro: 'This is the movie card. The image being shown is the movie\'s poster.',
								position: 'right',
							},
							{
								element: '#info-button',
								intro: 'You can use this button to read an overview of the movie.',
								position: 'right',
							},
							{
								element: '#swipe-left-button', 
								intro: 'Swipe left to dislike a movie. \nThis will show you a different set of movies.',
								position: 'right'
							},
							{
								element: '#swipe-right-button', 
								intro: 'Swipe right to like a movie. \nThis will show you similar, relevant movies.',
								position: 'right'
							},
							{
								element: '#match-button', 
								intro: 'Click this button to match with a movie. \n This stores the movie in your matches collection.',
								position: 'right'
							}
						],
						showStepNumbers: false,
						showBullets: false,
						exitOnOverlayClick: true,
						exitOnEsc: true,
						nextLabel: 'Next',
						prevLabel: 'Back',
					});
					intro.start();
	
					intro.oncomplete && intro.onbeforeexit(() => {
						window.scrollTo(0, 0);
					});
	
					
				}, 1000);
			}

			let obj = {}
			obj.username = username
			dispatch(initLogin(obj));

		
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

	return  (
		<div>
		<br></br><br></br><br></br>
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
									className='card flip-card-front' id="movie-card"
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
											id="info-button"
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
									<div>
										<h1 className='back-title'>
											{movie.title}
										</h1>
									</div>

									<div className='back-overview-wrapper'>
										<h1 className='back-overview'>
											{parseText(movie.overview)}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</TinderCard>
				))}
			</div>

			<div 
				className="congrats-bg" onClick={() => handleConfirmationBox()}>
				<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
			</div>

			<div className="congrats-container">
				<div className="congrats">
					<div className="congrats-text">
					Congrats, you've matched with the movie! It's been added to your <a className= "matches-hyperlink" href="http://localhost:3000/matches" target="_blank" rel="noreferrer"> collection</a> and
					you can also watch it here: <a className= "matches-hyperlink" href={`https://nyumatflix.herokuapp.com/movies/${id.value}`} target="_blank" rel="noreferrer"> nyumatflix</a>. 
					</div>
					<div className="ok-button-container">
						<button 
							className="bn632-hover bn27"
							onClick={() => handleConfirmationBox()}>
							OK
						</button>
					</div>
				</div>
			</div>
			
			<div className='buttons'>
				<button 
					id="swipe-left-button"
					className="bn632-hover bn27"
					onClick={() => swipe("left", currentIndex, false) && !isActive ? toggleFront() : null}>
					⬅️ Swipe Left
				</button>

				<button 
					id="match-button"
					className="bn632-hover bn27"
					onClick={() => swipe("right", currentIndex, true) && !isActive ? toggleFront() : null}>
					Match ⭐
				</button>

				<button 
					id="swipe-right-button"
					className="bn632-hover bn27"
					onClick={() => swipe("right", currentIndex, false) && !isActive ? toggleFront() : null}>
					Swipe Right ➡️
				</button>
			</div>
		</div>
		</div>
	);
}