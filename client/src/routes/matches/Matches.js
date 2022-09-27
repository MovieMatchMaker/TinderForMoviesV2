/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/Matches.css";
import { useEffect, useState } from "react";
import "../../styles/loading.css";
import { animations, AnimateGroup } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllMatches, deleteSingleMatch, removeMatch } from "../../slices/authSlice";

var options = {
	year: "numeric",
	month: "long",
	day: "numeric",
};

function Matches() {
	const [matches, setMatches] = useState([]);
	const dispatch = useDispatch();
	const storedMatches = useSelector(state => state.auth.matches);
	const username = useSelector(state => state.auth.username);

	
	const handleRemoveItem = (e, index) => {
		let request = {};
		request.toDelete = matches[index]
		request.username = username;
		e.persist();
		e.preventDefault();
		setMatches(matches.filter((match, i) => i !== index));
		dispatch(removeMatch(request.toDelete.id));	
		dispatch(deleteSingleMatch(request));
	};

	const deleteAll = (e) => {
		e.preventDefault();
		let request = {}
		request.username = username;
		dispatch(deleteAllMatches(request));
	}

	const parseText = (text) => {
		let max = 60;
		if (text.length < 1){
			return "No description provided 😢"
		}
		let words = text.split(" ");				

		if (words.length < max) {
			return text;
		} else {
			return words.slice(0, max).join(" ") + "...";
		}
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
					<p className='text-release'> Release date: &nbsp;
						{new Date(match.release_date).toLocaleDateString(
							"en-US",
							options
						)}
					</p>
					<h2 className='text-title'>{match.title}</h2>
					<p className='text-overview'>{ parseText(match.overview) }</p>

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
				<h1>No matches found 😢</h1>
				<br></br>
				<h1>
					{" "}
					Head back over to the matchmaking page{" "}
					<span
						id='no-matches-here'
						onClick={() => (window.location.href = "/swipe")}>
						here
					</span>{" "} in order
					to get your first matches!
				</h1>
			</div>
		);
	};

	useEffect(() => {
		setMatches(storedMatches);
	}, [storedMatches]);

	const ShowNumOfMatches = () => (
		<h1>Your Matches ({matches.length})</h1>
	)

	const ShowDeleteButton = () => (
		<a><button className="bn632-hover bn28" onClick={deleteAll}>Delete All</button></a>
	)

	const ListCollection = () => (
		<div className='viewport'>
			<ul className='list'>
				<AnimateGroup animation="fadeout" className="match-row">
					{mapMatches}
				</AnimateGroup>
			</ul>
		</div>
	)

	const NoMatches = () => (
		<AnimateGroup animation="fadeout" className="match-row">
			{noMatches()}
		</AnimateGroup>
	)

	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			{matches.length > 0 ? ShowNumOfMatches() : null}		{/* show "your matches" */}
			{matches.length > 0 ? ShowDeleteButton() : null}		{/* show "delete all" */}
			{matches.length > 0 ? ListCollection() : NoMatches()}	{/* show list or 404 */}
		</div>
	);
}

export default Matches;
