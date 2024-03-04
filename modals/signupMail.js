const mongoose = require("mongoose");

const signupMailSchema = mongoose.Schema({
	title: String,
	text: String,
});

module.exports = mongoose.model("signupMail", signupMailSchema);
