/* eslint-disable jsx-a11y/heading-has-content */
import "../styles/Cards.css";
import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import axios from "axios";

function Cards() {
	const [moviePosters, setMoviePosters] = useState([]);

	const getPopularMovies = async () => {
		const response = await axios.post(
			"/api/matching/get_current",
			{
				token: localStorage.getItem("token"),
			}
		);
		console.log(response.data.current_movie);
		const copy =  [...moviePosters];
		copy.push(response.data.current_movie);
		setMoviePosters(copy);
	}

	const getNextMovie = async () => {
		const response = await axios.post(
			"/api/matching/get_current",
			{
				token: localStorage.getItem("token"),
			}
		);
		const old_copy = [...moviePosters];
		const new_copy = [...old_copy];
		//new_copy.push(response.data.current_movie);
		setMoviePosters(new_copy);
	}



	const db = moviePosters;
	const [currentIndex, setCurrentIndex] = useState(db.length - 1);
	const [lastDirection, setLastDirection] = useState();
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(() => {
		const childRefs = [];
		for (let i = 0; i < db.length; i++) {
			childRefs.push(React.createRef());
		}
		return childRefs;
	}, [db.length]);

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < db.length - 1;

	const canSwipe = currentIndex >= 0;

	// set last direction and decrease current index
	const swiped = (direction, nameToDelete, index) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const outOfFrame = (name, idx) => {
		console.log(
			`${name} (${idx}) left the screen!`,
			currentIndexRef.current
		);
		// handle the case in which go back is pressed before card goes outOfFrame
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
		// TODO: when quickly swipe and restore multiple times the same card,
		// it happens multiple outOfFrame events are queued and the card disappear
		// during latest swipes. Only the last outOfFrame event should be considered valid
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < db.length) {
			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
		}
	};

	// increase current index and show card
	const goBack = async () => {
		if (!canGoBack) return;
		const newIndex = currentIndex + 1;
		updateCurrentIndex(newIndex);
		await childRefs[newIndex].current.restoreCard();
	};



	useEffect(() => {
		getPopularMovies();
	}, []);

	return (
		<div>
			<br></br>
			<br></br>
			<div className='cardContainer'>
				{db.map((movie, index) => (
					<TinderCard
						ref={childRefs[index]}
						className='swipe'
						key={movie.title}
						onSwipe={(dir) => swiped(dir, movie.title, index)}
						onCardLeftScreen={() => outOfFrame(movie.title, index)}>
						<div
							style={{
								backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`,
								animation: animations.popIn,
								animationDuration: "0.5s",
							}}
							className='card'>
							<h3>{movie.title}</h3>
						</div>
					</TinderCard>
				))}
			</div>
			<div className='buttons'>
			<a class="bn39" href="/"><span class="bn39span">Swipe left</span></a>
			<a class="bn39" href="/"><span class="bn39span">Match</span></a>
			<a class="bn39" href="/"><span class="bn39span">Swipe right</span></a>
			</div>
		</div>
	);
}

export default Cards;