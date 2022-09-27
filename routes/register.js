import { genSalt, hash } from "bcrypt"
import { User } from "../models/user.js"
import joi from "joi"
import { Router } from "express"
import generateAuthToken from "../utils/generateToken.js"
const router = Router()

router.post("/", async (req, res) => {
	const schema = joi.object({
		username: joi.string().min(3).max(200).required(),
		password: joi.string().min(6).max(200).required(),
	})

	const { error } = schema.validate(req.body)

	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ username: req.body.username })
	if (user) return res.status(400).send("User already exists...")

	console.log("here")

	const { username, password } = req.body
	const matches = []

	user = new User({ matches, username, password })

	const salt = await genSalt(10)
	user.password = await hash(user.password, salt)

	await user.save()

	const token = generateAuthToken(user)

	res.send(token)
})

export default router
