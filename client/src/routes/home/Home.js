import React from "react";
import "../../styles/Home.css";
import { Link } from "react-router-dom";
import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useState, useEffect } from "react";

function Home() {
	const emojis = ["🎥", "🍿", "🎬", "📽️", "🎞️", "📺", "⬅️", "🎦", "➡️"];
	const getRandomFrom = (array) =>
		array[Math.floor(Math.random() * array.length)];
	const [randomEmoji, setRandomEmoji] = useState(getRandomFrom(emojis));

	useEffect(() => {
		// Every five seconds change the emoji
		const interval = setInterval(() => {
			setRandomEmoji(getRandomFrom(emojis));
		}, 1300);
		return () => clearInterval(interval);
	});

	return (
		<div>
			<h1 style={{ animation: animations.fadeInUp }} id='welcome-header'>
				<span className='ms'>M</span>ovie<span className='ms'>M</span>
				atch<span className='ms'>M</span>aker
			</h1>

			<div id='welcome-text'></div>

			<Link to='/signup'>
				<div
					style={{ animation: animations.fadeInUp }}
					id='button-container'>
					<a href='/'>
						{" "}
						<button className='bn29'>
							{" "}
							<span style={{ "font-size": "2.4rem" }}>
								Sign Up!
							</span>
						</button>
					</a>
				</div>
			</Link>

			<Link to='/login'>
				<div
					style={{ animation: animations.fadeInUp }}
					id='button-container'>
					<a href='/'>
						{" "}
						<button className='bn29'>
							{" "}
							<span style={{ "font-size": "2.4rem" }}>
								Login!
							</span>
						</button>
					</a>
				</div>
			</Link>

			<Link to='/swipe'>
				<div
					style={{ animation: animations.fadeInUp }}
					id='button-container'>
					<a href='/'>
						{" "}
						<button className='bn29'>
							{" "}
							<span className='text'>
								{" "}
								Start Swiping! &nbsp;
								<AnimateOnChange
									animationIn='popIn'
									animationOut='popOut'>
									{randomEmoji}
								</AnimateOnChange>
							</span>
						</button>
					</a>
				</div>
			</Link>
		</div>
	);
}

export default Home;
