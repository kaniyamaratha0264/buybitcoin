const express = require("express");
const router = express.Router();
const ethers = require("ethers");
const session = require("express-session");

const MetamaskLogin = require("../modals/metamaskLogin");

router.post("/metamaskLogin", async (req, res) => {
	const { msgParams, signature, address } = req.body;
	const types = {
		Message: msgParams.map((param) => ({ name: param.name, type: param.type })),
	};
	const domain = {};
	const message = msgParams.reduce(
		(acc, cur) => ({ ...acc, [cur.name]: cur.value }),
		{}
	);
	const signer = ethers.utils.verifyTypedData(
		domain,
		types,
		message,
		signature
	);
	const userExist = await MetamaskLogin.findOne({ address: signer });
	if (userExist) return res.send("User Already Exist");
	if (signer === address) {
		const user = new MetamaskLogin({ address: signer });
		await user.save();
		res.send("success");
	} else {
		res.send("failed");
	}
});

// Protect routes that require authentication
router.get("/dashboard", (req, res) => {
	if (!req.session.email) {
		return res.redirect("/login");
	}
	res.render("dashboard", { email: req.session.email });
});

// Initialize the session middleware
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

module.exports = router;
