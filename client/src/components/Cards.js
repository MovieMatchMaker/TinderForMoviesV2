/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import "../styles/Cards.css";
import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {animations} from 'react-animation';
import { useSpring, animated as a } from 'react-spring';

var counter = 0;

export default function Cards () {

	const navigate = useNavigate();
	const [db, setDb] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(db.length);
	
	const currentIndexRef = useRef(currentIndex)

	const childRefs = useMemo(() => {
		const refs = [];
		for (let i = 0; i < db.length; i++) {
			refs.push(React.createRef());
		}
		return refs;
	}, [db]);


	const getFirst = async () => {
		const response = await axios.get("/api");
		const append = response.data.results[15];
		setDb([append]);
	}

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val)
		currentIndexRef.current = val
	}

	if (localStorage.getItem("token") === null) {
		navigate("/");
	} 

	const getNextMovie = async (id) => {
		counter +=1;
		console.log(id)
		await axios.get("/api/matching/next", 
			{ params: {
				id: id,
				counter: counter
			}}
		).then((response) => {
			const copy = [...db];
			copy.push(response.data.current_movie);
			setDb([...copy]);	
		}).catch((err) => {
			console.log(err);
		});
	}

	const movies = db
	const [lastDirection, setLastDirection] = useState()

	const swiped = async (direction, nameToDelete, index) => {
		if (direction === 'left') {
			// show a new set of movies
		} else if (direction === 'right') {
			// keep the same set of movies / reccomend more 
		} else if (direction === 'right') {
			// add to matches list, show more movies like matched movie
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
		}
		
		await getNextMovie(db[counter].id)
			.catch((err) => {
				console.log(err);
			});
		updateCurrentIndex(index + 1);
		setLastDirection(direction)
		console.log('Last direction was: ' + lastDirection)
	}
	
	const outOfFrame = (title) => {
		console.log(title + ' left the screen!')
	}
	
	const swipe = async (dir, index, isMatch) => {

		if (isMatch) {
			return (
				<div>
					<h1>You and {db[index].title} are a match!</h1>
				</div>
			)
		}

		if (dir === 'left') {
			// show a new set of movies
		} else if (dir === 'right') {
			// keep the same set of movies / reccomend more 
		} else if (dir === 'right' && isMatch) {
			// add to matches list, show more movies like matched movie
		} else {
			// Swiped up or down, (could just prevent this and delete the clause)
		}
		await getNextMovie(db[counter].id)
			.catch((err) => {
				console.log(err);
			});
		updateCurrentIndex(index + 1);
		setLastDirection(dir)
		if (currentIndex < db.length) {
			await childRefs[currentIndex].current.swipe(dir)
				.catch((err) => {
					console.log(err);
				});
		}
	}
	const cardRef = useRef(null);
	const iconRef = useRef(null);

	useEffect(() => {
		getFirst();
		window.onload = () => {
			let card = cardRef.current;
			let icon = iconRef.current;
			icon.addEventListener('click', handleIconClick);
			
					const flipCard  = () => {
						console.log("Flipped")
					}
			
					const handleIconClick = () => {
						console.log("Icon clicked")
						flipCard();
					}
		}

		



	}, []);





	const flipCard = (e) => {
		// var flipCardInner = document.getElementsByClassName(".flip-card-inner");
		// flipCardInner.style.transform = "rotateY(180deg)";

	}

	
	return (
		<div>
			<link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
			<link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
			<div className='cardContainer'>
			{movies.map((movie, index) =>
			<TinderCard 
			className='swipe' key={index} onSwipe={(dir) => swiped(dir, movie.title,index)} onCardLeftScreen={() => outOfFrame(movie.title)} ref={childRefs[index]}>
				{/* animation: animations.slideIn,
				animationDuration: "0.5s",
					class is card 
				*/}
				{/* <div
					style={{
						backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`,
					}}
					className='card'>
					<h3>{movie.title}</h3>
				</div> */}


				<div className="flip-card">
					
					
					<div className="flip-card-inner" ref={cardRef}>


						<div className='card flip-card-front'  style={{
							backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`,
						}}>

							
							<div className='back-img' onClick={flipCard()} ref={iconRef}>
								<img src="https://img.icons8.com/ios/50/undefined/info--v1.png"/>
							</div>
							<h3>{movie.title}</h3>
						
							

						</div>


						<div className='flip-card-back'>

							<h1>{movie.title}</h1>
							<h1 className='back-overview'>{movie.overview}</h1>

						</div>


					</div>



				</div>

			</TinderCard>
			)}
			</div>
			<div className='buttons'>
				<button className="bn39"onClick={() => swipe('left', currentIndex, false)}><span className="bn39span">Swipe Left!</span></button>
				<button className="bn39"onClick={() => swipe('right', currentIndex, true)}><span className="bn39span">Match!</span></button>
			      <button className="bn39"onClick={() => swipe('right', currentIndex, false)}><span className="bn39span">Swipe Right!</span></button>
			</div>
		</div>
	)
				
}
