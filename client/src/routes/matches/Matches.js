import React from "react";
import "../../styles/Matches.css";
import { useEffect, useState } from "react";
import "../../styles/loading.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useSelector } from "react-redux";

var options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

function Matches() {
	const [matches, setMatches] = useState([]);
	
	// Retireve the matches from the store
	const storedMatches = useSelector(state => state.matches.matches);

	const mapMatches = matches.map((match) => {
		return (
			<div
				key={match.id}
				style={{
					animation: animations.fadeInUp,
					animationDuration: "1s",
				}}
				className='container'>
				<img
					className='image'
					src={`https://image.tmdb.org/t/p/w500${match.poster_path}`}
					alt=''
				/>
				<div className='overlay'>
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
					{matches.length > 0 ? mapMatches : noMatches()}
				</ul>
			</div>
		</div>
	);
}

export default Matches;
