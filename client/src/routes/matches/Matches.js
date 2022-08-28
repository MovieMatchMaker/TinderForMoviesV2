/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/Matches.css";
import { useEffect, useState } from "react";
import "../../styles/loading.css";
import { animations, AnimateOnChange, AnimateGroup } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllMatches, removeMatch } from "../../slices/authSlice";

var options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

function Matches() {
	const [matches, setMatches] = useState([]);
	const dispatch = useDispatch();
	const storedMatches = useSelector(state => state.auth.matches);
	const username = useSelector(state => state.auth.username);

	const [isActive, setIsActive] = useState(false);

	const handleClick = event => {
		// 👇️ toggle isActive state on click
		setIsActive(current => !current);
	};
	
	const handleRemoveItem = (e, index) => {
		e.persist();
		e.preventDefault();
		handleClick();
		setMatches(matches.filter((match, i) => i !== index));
		dispatch(removeMatch(matches[index].id));	
	};

	const delete_all_matches = (e) => {
		e.preventDefault();
		dispatch(deleteAllMatches(username));
	}

	
	const mapMatches = matches.map((match, index) => {
		return (
			
			<div
				key={match.id}
				style={{
					animation: animations.fadeInUp,
					animationDuration: "1s",
				}}
				className='container'>
					<a href="#" onClick={(e) => handleRemoveItem(e, index)} className="match-delete">
						</a>
					
				<img
					className='image'
					src={`https://image.tmdb.org/t/p/w500${match.poster_path}`}
					alt=''
				/>
				
				<div className='overlay'>
					<a href="#" onClick={(e) => handleRemoveItem(e, index)} className="match-delete">
						</a>
					<p className='text-release'>
						{new Date(match.release_date).toLocaleDateString(
							"en-US",
							options
						)}
					</p>
					<h2 className='text-title'>{match.title}</h2>
					<p className='text-overview'>{match.overview}</p>
				</div>
			</div>
		);
	});

	const noMatches = () => {
		return (
			<div
				className='no-matches'
				style={{
					animation: animations.popIn,
					animationDuration: "0.7s",
				}}>
				<h1>No matches found!</h1>
				<br></br>
				<h1>
					{" "}
					Head back over to the matchmaking page{" "}
					<span
						id='no-matches-here'
						onClick={() => (window.location.href = "/swipe")}>
						here,
					</span>{" "}
					to get your first matches!
				</h1>
			</div>
		);
	};


	useEffect(() => {
		setMatches(storedMatches);
	}, []);

	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<h1>Matches ({matches.length})</h1>
			<div className='viewport'>
				<ul className='list'>
					<AnimateGroup animation="fadeout" className="match-row">
						{matches.length > 0 ? mapMatches : noMatches()}
					</AnimateGroup>
				</ul>
			</div>
		</div>
	);
}

export default Matches;
