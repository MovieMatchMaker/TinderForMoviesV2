import jwt from "jsonwebtoken"

const generateAuthToken = (user) => {
	const jwtSecretKey = process.env.REACT_APP_JWT_SECRET_KEY
	const token = jwt.sign({
		_id: user._id,
		matches: user.matches,
		username: user.username,
	},
	jwtSecretKey
	)

	return token
}

export default generateAuthToken
