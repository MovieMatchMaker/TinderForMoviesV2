import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import NavigationBar from "../../components/NavigationBar";
import {Fade} from 'react-reveal';
import { useInView } from "react-cool-inview";



export default function Home() {
	const emojis = ["🎥", "🍿", "🎬", "📽️", "🎞️", "📺", "⬅️", "🎦"];
	const getRandomFrom = (array) =>
		array[Math.floor(Math.random() * array.length)];
	const [randomEmoji, setRandomEmoji] = useState(getRandomFrom(emojis));

	const { observe, inView } = useInView({
	// Stop observe when the target enters the viewport, so the "inView" only triggered once
	unobserveOnEnter: true,
	// Shrink the root margin, so the animation will be triggered once the target reach a fixed amount of visible
	rootMargin: "-100px 0px",
	});

	


	const checkIfLoggedIn = () => {
		if (localStorage.getItem("token")) {
			return true;
		} else {
			return false;
		}
	};

	const isLoggedIn = checkIfLoggedIn();


	useEffect(() => {
		document.body.style.overflow = "scroll";
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
	
			<div className="welcome">

		
				<span id="splash-overlay" class="splash">
				
				<h1
					style={{ animation: animations.fadeInUp }}
					id='welcome-header'>
					<span className='ms'>M</span>ovie
					<span className='ms'>M</span>
					atch<span className='ms'>M</span>aker
				</h1>


				<div className="intro-text-wrapper">
					

					<ul className="text-list">
						<h1 className="top-text" ref={observe}>
							{inView &&  <Fade bottom>FIND YOUR MATCH 
							<AnimateOnChange
									animationIn='popIn'
									animationOut='popOut'>
									{randomEmoji}
							</AnimateOnChange> </Fade>}
						</h1>

						<h1 className="mid-text" ref={observe}>
							{inView &&  <Fade bottom>MovieMatchMaker is a quick and simple way to find a movie. Inspired by the Tinder interface, the system allows you to field potential movie matches, being suggested more and more relevant movies as you go. </Fade>}
						</h1>

						<h1 className="base-text" ref={observe}>
							{inView &&  <Fade bottom>Swiping right on a movie tells us that you would like to see similar films. Swiping left tells us you aren`t interested. 
						</Fade>}
						</h1>

						<h1 className="bottom-text" ref={observe}>
							{inView &&  <Fade bottom>Sign up, get swiping, and find your match today. </Fade>}
						</h1>
						
					</ul>

				</div>
				

				<br></br><br></br>
				<Link to='/signup'>
					<div
						style={{ animation: animations.fadeInUp }}
						id='button-container'>
						{" "}
						<button className='bn632-hover bn27 effect'>
							{" "}
							<span style={{ fontSize: "2.4rem" }}>Sign Up</span>
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
							<span style={{ fontSize: "2.4rem" }}>Login</span>
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

