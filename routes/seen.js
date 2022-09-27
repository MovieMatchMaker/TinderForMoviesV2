import { User } from "../models/user.js"
import { Router } from "express"
const router = Router()

router.post("/", async (req, res) => {
	const username = req.body.username
	const newEntry = req.body.movie_id
	try {
		let user = await User.findOne({ username: username })
		user = JSON.parse(JSON.stringify(user))
		user.seen.push(newEntry)
		let addMatch = User.findOneAndUpdate({ username: username }, { $set: { seen: user.seen } }).exec()
		res.send(user)
	} catch (error) {
		res.send(error)
		console.trace(error)
	}

})

export default router