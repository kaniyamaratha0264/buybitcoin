const express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
let { User } = require("../modals/user");
const crypto = require("crypto");

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const signupMail = require("../modals/signupMail");

router.post("/signup", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User with given email already exist");
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	await user.generateHashedPassword();
	await user.save();

	const record = await signupMail.findOne({ title: "signupmail" });
	let response = {
		email: req.body.email,
		text: record?.text,
		subject: "Welcome to BuyBitcoin",
	};
	res.status(200).send(response);
});
router.post("/deleteuser", auth, admin, async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User with given email doesn't exist");

	await user.deleteOne();
	return res.status(200).send("success");
});
router.post("/updateSignupMail", auth, admin, async (req, res) => {
	let mailRecord = await signupMail.findOne({ title: "signupmail" });
	if (mailRecord) {
		mailRecord.text = req.body.text;
		await mailRecord.save();
	} else {
		let mailRecord = new signupMail({
			title: "signupmail",
			text: req.body.text,
		});
		await mailRecord.save();
	}
	return res.status(200).send("success");
});

router.get("/getSignupMail", auth, admin, async (req, res) => {
	const record = await signupMail.findOne({ title: "signupmail" });
	res.status(200).send(record?.text);
});

router.post("/login", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User with given email doesn't exist");
	let isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(401).send("Invalid Password");
	let token = jwt.sign(
		{ _id: user._id, name: user.name },
		process.env.jwtPrivateKey
	);
	res.send(token);
});

router.get("/users", auth, admin, async (req, res) => {
	let userData = await User.find().select("-password");
	res.status(200).send(userData);
});
router.post("/editbyAdmin", auth, admin, async (req, res) => {
	let { oldEmail, email, password } = req.body;

	let userData = await User.findOne({ email: oldEmail });

	if (!userData) {
		return res.send("No user found for this email address")
	}
	if (email) {
		userData.email = email;
	}
	if (password) {
		userData.password = password;
		await userData.generateHashedPassword();
	}
	await userData.save();

	res.send("Success");
});
router.get("/verify", auth, async (req, res) => {
	let user = req.user;
	if (user.role === "admin") res.status(200).send(true);
	else res.status(200).send(false);
});

router.post("/getProfilebyAdmin", auth, admin, async (req, res) => {
	let { id } = req.body;
	let userData = await User.findOne({ _id: id });
	res.send(userData);
});

router.get("/getProfile", auth, async (req, res) => {
	let user = req.user;
	res.send(user);
});
router.post("/forgotsend", async (req, res) => {
	let { email } = req.body;
	var token = crypto.randomBytes(64).toString("hex");

	let userData = await User.findOne({ email: email });
	if (!userData) {
		return res.status(400).send("User with given email doesn't exist");
	}

	userData.forgot = token;
	userData.save();

	let text = `Use this token to reset your password: ${token}`;
	let response = {
		email: email,
		text: text,
		subject: "Forgot Password?",
	};
	res.status(200).send(response);
});
router.post("/forgotverify", async (req, res) => {
	let { token, password } = req.body;

	let userData = await User.findOne({ forgot: token });
	if (!userData) {
		return res.status(400).send("Invalid Token");
	}

	userData.forgot = "null";
	userData.password = password;
	await userData.generateHashedPassword();
	await userData.save();

	return res.status(200).send("Password Changed Successfully");
});

router.post("/editProfile", auth, async (req, res) => {
	let user = req.user;
	let { name, email, password, walletAddress } = req.body;
	console.log(name, "name");
	let userData = await User.findOne({ email: user.email });

	userData.name = name;
	userData.email = email;
	if (password) {
		userData.password = password;
	}
	userData.wallet = walletAddress;

	await userData.generateHashedPassword();
	await userData.save();

	res.send("Success");
});

module.exports = router;
