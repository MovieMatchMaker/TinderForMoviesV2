import { User } from "../models/user.js"
import { Router } from "express"
const router = Router()

router.post("/", async (req, res) => {
	let username = req.body.username
	let obj = JSON.parse(JSON.stringify(req.body))
	try {
		let toDelete = await User.updateOne(
			{ username: username },
			{ $pull: { "matches": {"id" : obj.toDelete.id}}
			})
		res.status(200).send(`Match deleted ${toDelete}`)
	} catch (error) {
		res.send(error)
	}
})

export default router