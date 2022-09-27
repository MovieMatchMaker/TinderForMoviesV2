import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import axios from "axios"
import mongoose from "mongoose"
import matches from "./middleware/matches.js"
import login from "./routes/login.js"
import initLogin from "./middleware/initial_login.js"
import register from "./routes/register.js"
import save from "./routes/save.js"
import deleteAll from "./routes/delete.js"
import deleteSingle from "./routes/delete_single.js"
import headers from "./utils/setHeaders.js"
import tracker from "./middleware/tracker.js"
import swipe_left from "./routes/swipe_left.js"
import swipe_right from "./routes/swipe_right.js"
import seen from "./routes/seen.js"

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static("public"))

// Set headers for the the requests
app.use(headers,)
// Track all the requests in the console
app.use(tracker)
// Log the user in, and return a token
app.use("/api/login", login)
// Register a new user, save them to MongoDB, and return a token
app.use("/api/register", register)
// Save a new match the the database
app.use("/api/save_match", save)
// Delete all matches from the database
app.use("/api/delete_matches", deleteAll)
// Delete a single match from the database
app.use("/api/delete_one", deleteSingle)
// Get all matches for a user
app.use("/api/matches", matches)
// Recommend a new movie when the user swipes right
app.use("/api/swipe_right", swipe_right)
// Recommend a new movie when the user swipes left
app.use("/api/swipe_left", swipe_left)
// Add a movie to the seen list
app.use("/api/add_seen_movie", seen)
// Set their initial login status to false
app.use("/api/init_login", initLogin)



app.post("/api/get_movie", (req, res) => {
	let id = Math.floor(Math.random() * 10) || Math.floor(Math.random() * 10)
	let page = Math.floor((Math.random()*10) + 1) 
	axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`      
	)
		.then((response) => {
			if (response.data.results[page].poster_path !== undefined) {
				let random = Math.floor(Math.random() * response.data.results.length)
				res.send(response.data.results[random]).status(200)
			} 
		})
		.catch((err) => {
			res.send(err)
		})
})   

const uri = process.env.URI
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connection established..."))
	.catch((error) => console.error("MongoDB connection failed:", error.message))


const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})