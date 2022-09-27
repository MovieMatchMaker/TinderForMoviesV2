 <h3 align="center"><img width="800" height="200" src="movie_matchmaker.png">
  <br>
 <p align ="center">
  <b><i>By Tom Nyuma, Artem Kolpakov, and Daniel Zahariev</i></b>
</p>
    <p align="center">
      <img width="100" height="30" src="https://badges.aleen42.com/src/react.svg">
      <img width="100" height="30" src="https://badges.aleen42.com/src/node.svg">
      <img width="100" height="30" src="https://badges.aleen42.com/src/redux.svg">
      <img width="120" height="30" src="https://badges.aleen42.com/src/javascript.svg">
      <img width="100" height="30" src="https://badges.aleen42.com/src/npm.svg">
      <img width="120" height="30" src="https://badges.aleen42.com/src/webpack.svg">
      <br>
    </p>
 </h3>
 


<h1> What is "MovieMatchMaker"? 🧐 </h1>

<p>
 Have you ever found yourself in an endless loop? Scrolling, <b>all day, all night,</b> in search of a movie...with no end in sight?</b> <br> <br> <b>Well,</b> MovieMatchMaker might just be for you. 
</p>

<h1> Overview </h1>

<p>
  At its core, MovieMatchMaker is really just Tinder, although for Movies. We were inspired by Tinder and the ability to "match" with people.<br>
 <br>
 <b>However,</b> as we all know (unless you're Brad Pitt): Tinder is Pay to Win.<br><br>
 <b>So naturally,</b> what we did was utilize the MERN (<b>MongoDB</b> - <b>Express</b> - <b>React</b> - <b>Node</b>) stack to flip that concept upside down. 😎 <br><br>
 
<h1>Quick Specs </h1>

- [React-Tinder-Card](https://github.com/3DJakob/react-tinder-card) 
   - To enable Tinder-like swiping 
- [Redux](https://redux.js.org/)
   - Store the global application state
- [React](https://reactjs.org/)
   - Reusable Components and Robustness
- [MongoDB](https://www.mongodb.com/)
   - NoSQL Database for easy CRUD operations
- [TheMovieDB](https://developers.themoviedb.org/3/getting-started)
   - Data store for our algorithm
- [Webpack](https://webpack.js.org/)
   - Module builder and code splitting
- [HTTP-Proxy](https://www.npmjs.com/package/http-proxy-middleware)
   - Frontend/Backend communication synchronously
- [Express](https://expressjs.com/)
   - Manage API, server, and routes
- [Create React App](https://create-react-app.dev/)
   - Simple React boilerplate builder
 


<h2>Installation</h2>

<p>
  To run the project locally, <b> navigate to your command line and type: </b>
</p>

```
git clone https://github.com/CS290-Final-Project-Team-24/TinderForMoviesV2.git
```

<p>
  <b>Next,</b> cd into the directory
</p>

```
cd TinderForMoviesV2
```

Once you're there, you'll need to install the packages from npm

```
npm install
```

<b>Notice! Don't forget run npm install in ~/TinderForMoviesV2/client</b>

The server side uses a .env file to project secrets, so create a <b>.env</b> in the root directory

```
touch .env
```

Grab an API Key from [TheMovieDatabase API](https://developers.themoviedb.org/3/getting-started/introduction) and put it in the created .env file

The .env file should look something like this:
```
PORT=[YOUR LOCALHOSTPORT HERE]
REACT_APP_TMDB_API_KEY=[YOUR THEMOVIEDB API KEY HERE]
URI=[YOUR MONGO DB URI HERE]
JWT_SECRET_KEY=[YOUR JSON WEB TOKEN KEY HERE]
```

You can now run a devlopment environment with Hot Module Replacement by navigating to the root dir and using:
```
npm run dev
```

Or you could just watch a [demo](https://drive.google.com/file/d/1Ml4DUwqGsJUOtaRiTPDloRr0rATGGXKh/view?usp=sharing) of how our app currently works before it's fully ready to be deployed. 🤫

### Happy Swiping, and Go Beavs! 🦦 

## License

[MIT License](https://opensource.org/licenses/MIT)

## To-Do

- [x] Bring over V1 files 
- [x] Add Routes 
- [x] File Seperation
- [x] Connect MongoDB 
- [x] Style Each Route
- [ ] Incorporate the Recommendation Algorithm
- [x] Finish Documentation
- [x] Figure out data collection
