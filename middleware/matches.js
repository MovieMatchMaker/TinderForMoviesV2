import { Router } from "express"
import { User } from "../models/user.js"


const router = Router()

router.post("/", async (req, res) => {
	let username = req.body.username
	console.log(" Req.body: \n", req.body)
	try {
		let user = await User.findOne({ username: username }).exec()
		res.send(user.matches)
	} catch (error) {
		res.send(error)
		console.trace(error)
	}
})

export default router