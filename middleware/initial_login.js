import { User } from "../models/user.js"
import { Router } from "express"
const router = Router()

router.post("/", async (req, res) => {
	let username = req.body.username
	try {
		let user = await User.findOne({ username: username }).exec()
		let initialLogin = user.initialLogin
		let initLogin = await User.updateOne(
			{ username: username },
			{ $set: { "initLogin": false } }
		)
		res.status(200).send({
			message: "Initial login status set to false",
			initLogin: false
		})
	} catch (error) {
		res.send(error)
	}
})

export default router