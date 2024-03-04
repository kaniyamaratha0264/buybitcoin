const jwt = require("jsonwebtoken");

const { User } = require("../modals/user");

async function trx(req, res, next) {
	let token = req.header("x-auth-token");
	console.log(token);
	if (token)
		try {
			const decoded = jwt.verify(token, process.env.jwtPrivateKey);
			req.user = decoded;
			const user = await User.findById(req.user._id).select("-password");
			if (!user)
				return res.status(400).send("Invalid Token: User do not exist");
			req.user = user;
		} catch (error) {
			return res.status(401).send("Invalid Token");
		}
	next();
}

module.exports = trx;
