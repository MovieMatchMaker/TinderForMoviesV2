 <h1 align="center"><b>Tinder, but for Movies</b>
  <br>
  <br>
    <p align="center">
      <img width="100" height="30" src="https://badges.aleen42.com/src/react.svg">
      <img width="100" height="30" src="https://badges.aleen42.com/src/node.svg">
      <img width="120" height="30" src="https://badges.aleen42.com/src/javascript.svg">
      <img width="100" height="30" src="https://badges.aleen42.com/src/npm.svg">
      <br>
    </p>
 </h1>
 
<p align ="center">
  <i>By Tom Nyuma, Artem Kolpakov, and Daniel Zahariev</i>
</p>


<h2> Overview </h2>

<p>
  TinderForMovies is a full-stack application designed and developed by us three as a final project for CS290 - Web Development.
  <br>
</p>


<h2> Running The Project Locally</h2>

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

Also, the server side uses a .env file to store the port and API Key, so type:

```
touch .env
```

The .env file should look something like this: **(Don't forget to replace 'xxxx' with your specifications!)**
```
PORT=XXXX
REACT_APP_TMDB_API_KEY=XXXXXXXXXXXXXX
```

Finally, grab an API Key from [TheMovieDatabase API](https://developers.themoviedb.org/3/getting-started/introduction) and put it in the created .env file

You can now run a devlopment environment with Hot Module Replacement by navigating to the root dir and using:
```
npm run dev
```
### Happy Swiping :D  

## License

MIT License

## To-Do

- [x] Bring over V1 files 
- [x] Add Routes 
- [x] File Seperation
- [ ] Connect MongoDB 
- [ ] Style Each Route
- [ ] Incorporate the Recommendation Algorithm
- [x] Finish Documentation
- [ ] Figure out data collection
