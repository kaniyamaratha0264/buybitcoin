let mongoose = require("mongoose");

let wallet = new mongoose.Schema({
	title: String,
	value: Number,
});

module.exports = mongoose.model("wallet", wallet);
