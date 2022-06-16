import React from "react";
import "../../styles/Matches.css";
import { useEffect, useState } from "react";
import "../../styles/loading.css";
import { animations } from "react-animation";
import "react-animation/dist/keyframes.css";
function Matches() {
	var options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const [matches, setMatches] = useState([]);

	const getMatches = async () => {
		const response = await fetch("/api/matches");
		const data = await response.json();
		setMatches(data.results);
	};

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
		getMatches();
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
