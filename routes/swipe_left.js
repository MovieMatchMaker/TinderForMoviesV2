import { User } from "../models/user.js"
import { Router } from "express"
import axios from "axios"
import dotenv from "dotenv"
const router = Router()
dotenv.config()

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min
}

router.post("/", async (req, res) => {
	let username = req.body.username

	try {

		let user = await User.findOne({ username: username })
		user = JSON.parse(JSON.stringify(user))
		let newMovie = {}

		let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${getRandomArbitrary(1,10)}&vote_average.gte=${getRandomArbitrary(6,9)}&with_original_language=en&with_watch_monetization_types=flatrate`)
		console.log(response)
		let movies = response.data.results

		for (let i = 0; i < movies.length; i++) {
			if (!user.seen.includes(movies[i].id)) {
				newMovie = movies[i]
				break
			} 
		}

		res.send(newMovie)            

	} catch (error) {
		res.send(error)
		console.trace(error)
	}

})

export default router