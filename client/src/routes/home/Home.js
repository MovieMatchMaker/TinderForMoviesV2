import React from "react";
import "../../styles/Home.css";
import { Link } from "react-router-dom";
import { animations, AnimateOnChange } from "react-animation";
import "react-animation/dist/keyframes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
function Home() {
   const emojis = ["🎥", "🍿", "🎬", "📽️", "🎞️", "📺", "⬅️", "🎦"];
   const getRandomFrom = (array) =>
       array[Math.floor(Math.random() * array.length)];
   const [randomEmoji, setRandomEmoji] = useState(getRandomFrom(emojis));
 
	function checkIfLoggedIn(){
		if(!localStorage.getItem("token")){
			navigate('/login')
			return true;
		}
		navigate("/login")
		return false;
	}

   useEffect(() => {
       // Every five seconds change the emoji
       const interval = setInterval(() => {
           setRandomEmoji(getRandomFrom(emojis));
       }, 1300);
       return () => clearInterval(interval);
   });
 
   const navigate = useNavigate();
 
   return (
       <div>
           <h1 style={{ animation: animations.fadeInUp }} id='welcome-header'>
               <span className='ms'>M</span>ovie<span className='ms'>M</span>
               atch<span className='ms'>M</span>aker
           </h1>
 
           <div id='welcome-text'>
               <p>
               Welcome to MovieMatchMaker! Treat is as a Tinder, but for movies. For each recommendation, you can either swipe left, swipe right, or click match. 
			   Swiping left on a movie tells us that you want to see more movies like the one you swiped on, swiping right tells us to present fewer movies like it. The match
               button means you would like to 'match' with the movie and save it into your golden collection of matches.
               </p>
           </div>
 
           {/* <Link to='/signup'>
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
           </Link> */}

           <Link to='/swipe'> {/* if not logged in -> sign up, else -> swiping*/}
               <div
                   style={{ animation: animations.fadeInUp }}
                   id='button-container'>
                   <a href='/'>
                       {" "}
                       <button onClick={checkIfLoggedIn} className='bn29'>
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
}
 
export default Home;
