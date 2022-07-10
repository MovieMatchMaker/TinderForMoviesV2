import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/Home.css";


export default function Home() {
	const emojis = ["🎥", "🍿", "🎬", "📽️", "🎞️", "📺", "⬅️", "🎦"];
	const getRandomFrom = (array) =>
		array[Math.floor(Math.random() * array.length)];
	const [randomEmoji, setRandomEmoji] = useState(getRandomFrom(emojis));

	const checkIfLoggedIn = () => {
		if (localStorage.getItem("token")) {
			return true;
		} else {
			return false;
		}
	};

	const isLoggedIn = checkIfLoggedIn();

	useEffect(() => {
		// Every five seconds change the emoji
		const interval = setInterval(() => {
			setRandomEmoji(getRandomFrom(emojis));
		}, 1300);
		return () => clearInterval(interval);
	});

	if (isLoggedIn) {

	return  (
		<div>
            <br>
            </br>
			<h1 style={{ animation: animations.fadeInUp, animationDuration: '1.0s' }} id='welcome-header'>
				<span className='ms'>M</span>ovie<span className='ms'>M</span>
				atch<span className='ms'>M</span>aker
			</h1>

			<div style={{animation: animations.bounceIn , animationDuration: "0.7s"}} id='welcome-text'>

				{/* <p>
				Welcome to MovieMatchMaker! Treat is as a Tinder, but for movies. For each recommendation, you can either swipe left, swipe right, or click match. 
				Swiping left on a movie tells us that you want to see more movies like the one you swiped on, swiping right tells us to present fewer movies like it. The match
				button means you would like to 'match' with the movie and save it into your golden collection of matches.
				</p> */}

				{/* <p>
					Welcome to MovieMatchMaker -- the tinder like experience for movies! Swipe left on a movie 
					to see less like it. Swipe right on a movie to see more movies similar to it! Our algorithm
					collects and uses this data to recommend you better movies to watch. If you absolutely love 
					the movie, you can also 'Match' with the movie and store it in your golden collection of matched movies.
				</p>

				<p>
					Click the (i) icon in the top right of a movie's card to see more details about the movie. 
					A lot of the time, using just pictures to determine if a movie is one you'd like to see is not enough,
					and because of this, we gave you that option. Beware, some movies have shorter descriptions than others, 
					so be weary.
				</p> */}


				<p>
					
				</p>

                <br>
            </br>
            <br>
            </br>
           		</div>
                <br>
            </br>
            <br>
            </br>
            <br>
            </br>

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
								Start Swiping&nbsp;
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
	} else {
		return (
			<div>


				<h1 style={{ animation: animations.fadeInUp }} id='welcome-header'>
				<span className='ms'>M</span>ovie<span className='ms'>M</span>
				atch<span className='ms'>M</span>aker
			</h1>

			<div style={{animation: animations.bounceIn , animationDuration: "0.5s"}} id='welcome-text'>
				<p>
				Welcome to MovieMatchMaker! Treat is as a Tinder, but for movies. For each recommendation, you can either swipe left, swipe right, or click match. 
				Swiping left on a movie tells us that you want to see more movies like the one you swiped on, swiping right tells us to present fewer movies like it. The match
				button means you would like to 'match' with the movie and save it into your golden collection of matches.
				</p>
           		</div>

			<Link to='/signup'>
				<div
					style={{ animation: animations.fadeInUp }}
					id='button-container'>
					<a href='/'>
						{" "}
						<button className='bn29'>
							{" "}
							<span style={{ "fontSize": "2.4rem" }}>
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
		</div>
		);
		}
}