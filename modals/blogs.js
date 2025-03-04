const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
	{
		blog: String,
		userEmail: String,
		title: {
			type: String,
		},
		userName: String,
		userImage: String,
	},
	{ timestamps: true }
);

const blogsModal = mongoose.model("blogsModal", blogsSchema);

module.exports.blogsModal = blogsModal;
