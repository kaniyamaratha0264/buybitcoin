const mongoose = require("mongoose");

const kycSchema = mongoose.Schema({
	txId: String,
	name: String,
	email: String,
	address: String,
	img1: String,
	img2: String,
	img3: String,
});

module.exports = mongoose.model("Kyc", kycSchema);
