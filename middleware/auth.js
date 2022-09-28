import { verify } from "jsonwebtoken"
require("dotenv").config()

function auth(req, res, next) {
	const token = req.header("x-auth-token")
	if (!token) return res.status(401).send("Access denied. Not authorized...")
	try {
		const jwtSecretKey = process.env.REACT_APP_JWT_SECRET_KEY
		const decoded = verify(token, jwtSecretKey)
		req.user = decoded
		next()
	} catch (ex) {
		res.status(400).send("Invalid auth token...")
	}
}

export default auth
