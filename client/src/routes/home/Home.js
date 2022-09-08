import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import NavigationBar from "../../components/NavigationBar";
import HomeCards from "../../components/HomeCards";


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
		return (
			<div>
				<br></br>	
				<h1
					style={{
						animation: animations.fadeInUp,
						animationDuration: "1.0s",
					}}
					id='welcome-header'>
					<span className='ms'>M</span>ovie
					<span className='ms'>M</span>
					atch<span className='ms'>M</span>aker
				</h1>

				
				
				<Link to='/swipe'>
					<div
						style={{ animation: animations.fadeInUp }}
						id='button-container'>
						<button className='bn632-hover bn27 home'>
							<span className='text'>
								Start Swiping&nbsp;
								<AnimateOnChange
									animationIn='popIn'
									animationOut='popOut'>
									{randomEmoji}
								</AnimateOnChange>
							</span>
						</button>
					</div>
				</Link>
				<NavigationBar />
			</div>
		);
	} else {
		return (
			<div className="welcome" style={
				{
					height: "3000px",
				}
			}>
				<span id="splash-overlay" class="splash">
				
				<h1
					style={{ animation: animations.fadeInUp }}
					id='welcome-header'>
					<span className='ms'>M</span>ovie
					<span className='ms'>M</span>
					atch<span className='ms'>M</span>aker
				</h1>


				<Link to='/signup'>
					<div
						style={{ animation: animations.fadeInUp }}
						id='button-container'>
						{" "}
						<button className='bn632-hover bn27 effect'>
							{" "}
							<span style={{ fontSize: "2.4rem" }}>Sign Up!</span>
						</button>
					</div>
				</Link>

				<Link to='/login'>
					<div
						style={{ animation: animations.fadeInUp }}
						id='button-container'>
						{" "}
						<button className='bn632-hover bn27 effect'>
							{" "}
							<span style={{ fontSize: "2.4rem" }}>Login!</span>
						</button>
					</div>
				</Link>

					{/* <HomeCards /> */}

				</span>
				<span id="welcome" class="z-depth-4">
				</span>
			</div>
		);
	}
}
