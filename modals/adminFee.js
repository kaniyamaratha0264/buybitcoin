let mongoose = require("mongoose");

let fee = new mongoose.Schema({
	title: String,
	fee: {
		type: Number,
		default: 0
	},
});
let AdminFee = mongoose.model("AdminFee", fee);

module.exports = AdminFee;
