/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useState,useReducer } from 'react'
import TinderCard from 'react-tinder-card'
import "../styles/Cards.css";
import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import icon from '../utils/icon';
// import Spinner from './Spinner';



// useReducer enables us to use a loading state in our component without having to use a loading state in the parent component.
// const reducer = (state, action) => {
// 	  switch (action.type) {
// 		case 'LOADING':
// 			return {
// 				...state,
// 				loading: true,
// 			}
// 		case 'SUCCESS':
// 			return {
// 				...state,
// 				loading: false,
// 			}
// 		default:
// 			return state;
// 		}
// 	}


export default function Cards () {

	

	const navigate = useNavigate();
	const [db, setDb] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(db.length);
	const [isActive, setActive] = useState(true);
	// const [isLoading, setLoading] = useState(false);
	// const [loading, dispatch] = useReducer(reducer, false);

	const currentIndexRef = useRef(currentIndex);

	
	const childRefs = useMemo(() => {
		const refs = [];
		for (let i = 0; i < db.length; i++) {
			refs.push(React.createRef());
		}
		return refs;
	}, [db]);
	
	const toggleClass = () => {
		setActive(!isActive);
	};

	const getFirst = async () => {
		const response = await axios.get("/api");
		const append = response.data.results[0];
		setDb([append]);

	}

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val)
		currentIndexRef.current = val
	}

	if (localStorage.getItem("token") === null) {
		navigate("/");
	} 

	const getCurrentMovie = async (id) => {
		document.getElementById("hidden").style.visibility = "hidden";
		const token = localStorage.getItem("token");
		if(token === null) {
			navigate('/logout');
		}

		console.log(id)
		await axios.post("/api/matching/get_current", 
		{ 
			id: id,
			token: token,

		}
		).then((response) => {
			console.log("Called get current movie")
			const copy = [...db];
			copy.push(response.data.current_movie);
			setDb([...copy]);	
		}).catch((err) => {
			console.log(err);
		});
	}

	const getNextMovie = async (id, direction) => {
		const token = localStorage.getItem("token");
		if (token === null) {
			navigate('/logout');
		}

		console.log(id)

		if (direction === 'right') {
			await axios.post("/api/matching/swipe_right", {
				id: id,
				token: token,

			}).then((response) => {
				console.log("Called get next movie")
				const copy = [...db];
				copy.push(response.data.current_movie);
				setDb([...copy]);
			}).catch((err) => {
				console.log(err);
			});
		} else {
			await axios.post("/api/matching/swipe_left", {
				id: id,
				token: token,

			}).then((response) => {
				console.log("Called get next movie")
				const copy = [...db];
				copy.push(response.data.current_movie);
				setDb([...copy]);
			}).catch((err) => {
				console.log(err);
			});
		}

	}

	const movies = db
	const [lastDirection, setLastDirection] = useState()

	const swiped = async (direction, nameToDelete, index) => {

		console.log(Array.from(db)[db.length - 1]);
		if (direction === 'left') {
			// show a new set of movies
			console.log(Array.from(db));
			await getNextMovie(db[db.length - 1].id, direction)
				.catch((err) => {
					console.log(err);
				});
			updateCurrentIndex(index + 1);
			setLastDirection(direction)
			console.log('Last direction was: ' + lastDirection)
		} else if (direction === 'right') {
			// keep the same set of movies / reccomend more 
			console.log(Array.from(db));
			await getNextMovie(db[db.length - 1].id, direction)
				.catch((err) => {
					console.log(err);
				});
			updateCurrentIndex(index + 1);
			setLastDirection(direction)
			console.log('Last direction was: ' + lastDirection)
		} else if (direction === 'right') {
			// add to matches list, show more movies like matched movie
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
			console.log("Swiped up or down");
		}
	}
	
	const outOfFrame = (title) => {
		console.log(title + ' left the screen!')
	}
	
	const getMatchMovie = async () => {
		const token = localStorage.getItem("token");
		if (token === null) {
			navigate('/logout');
		}

		await axios.post("/api/matching/match", {
			token: token,
		}).then((response) => {
			console.log(response);
			console.log("Called get match movie")
		}).catch((err) => {
			console.log(err);
		});
		
	}

	const swipe = async (dir, index, isMatch) => {
		if (isMatch) {
			// add to matches list, show more movies like matched movie
			setTimeout(fun => {
				document.getElementById("hidden").style.visibility = "visible";
			},1000)
			console.log(Array.from(db));
			await getMatchMovie()
				.catch((err) => {
					console.log(err);
				});
			updateCurrentIndex(index + 1);
			setLastDirection(dir)
			console.log('Last direction was: ' + dir)
			await childRefs[currentIndex].current.swipe(dir)
					.catch((err) => {
						console.log(err);
					});
			setTimeout(fun => {
				getCurrentMovie(db[db.length - 1].id)
			},6000);

		}

		if (dir === 'left') {
			// show a new set of movies
		} else if (dir === 'right') {
			// keep the same set of movies / reccomend more 
		} else if (dir === 'right' && isMatch) {
			// add to matches list, show more movies like matched movie
			// TODO: make the ui change in some way


		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
		}
		// await getCurrentMovie(db[counter].id)
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// updateCurrentIndex(index + 1);
		// setLastDirection(dir)
		// if (currentIndex < db.length) {
		// 	await childRefs[currentIndex].current.swipe(dir)
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// }
	}

	const parseText = (text) => {
		const sentences = text.split('.');
		if (sentences.length >= 4) {
			return sentences[0] + '.' + sentences[1] + '.' + sentences[2] + '...';
		} else {
			return text;
		}
	}
	
	useEffect(() => {
		// getFirst();
		getCurrentMovie();
	}, []);

	var id = 767 || db[db.length].id;
	return  (
		<div>
			<link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
			<link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
			<div className='cardContainer'>
			{movies.map((movie, index) =>
			<TinderCard 
			className='swipe' key={index} onSwipe={(dir) => swiped(dir, movie.title,index)} onCardLeftScreen={() => outOfFrame(movie.title)} ref={childRefs[index]}>
				<div className="flip-card" style={{animation: animations.fadeInUp , animationDuration: "0.5s"}}>
					<div className={isActive ? 'flip-card-inner': 'flip-card-inner spin'}>
						<div className='card flip-card-front'  style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`}}>
							<div className='back-img' onClick={toggleClass}>
								<img src={icon} alt='icon'/>
							</div>
							<h3>{movie.title}</h3>					
						</div>
						<div className='flip-card-back'>
							<div className='back-img'>
								<img src={icon} alt='icon' onClick={toggleClass} />
							</div>
							<h1 className='back-title'>{movie.title}</h1>
							<h1 className='back-overview'>{parseText(movie.overview)}</h1>
						</div>
					</div>
				</div>
			</TinderCard>
			)}
			</div>
			<div style={{animation: animations.bounceIn , animationDuration: "5.5s"}} id='welcome-text'>
				<p id='hidden'>You matched with a movie! You can watch it <a href={`www.nyumat.tech/movies/${id}`}>here!</a></p>
			</div>
			<div className='buttons'>
				<button className="bn39"onClick={() => swipe('left', currentIndex, false)}><span className="bn39span">Swipe Left!</span></button>
				<button className="bn39"onClick={() => swipe('right', currentIndex, true)}><span className="bn39span">Match!</span></button>
			      <button className="bn39"onClick={() => swipe('right', currentIndex, false)}><span className="bn39span">Swipe Right!</span></button>
			</div>
		</div>
	)		
}
