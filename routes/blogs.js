const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { blogsModal } = require("../modals/blogs");

router.post("/create", auth, async (req, res) => {
	try {
		let user = req.user;
		const { blog, title } = req.body;
		if (blog && title) {
			const response = await blogsModal.create({
				title,
				blog,
				userEmail: user.email,
				userName: user.name,
				userImage: "foundUser.image",
			});
			if (response)
				return res
					.status(200)
					.json({ message: "Blogs Create Successfully", status: "success" });
			else
				return res
					.status(401)
					.json({ message: "Blogs Create failed", status: "failed" });
		} else {
			return res
				.status(200)
				.json({ message: "Please provide all fields", status: "failed" });
		}
	} catch (err) {
		return res
			.status(500)
			.json({ message: "some thing went wrong", status: "success" });
	}
});
router.post("/update", auth, async (req, res) => {
	try {
		const { blog, title, id } = req.body;
		let record = await blogsModal.findOne({ _id: id });
		if (!record)
			return res
				.status(401)
				.json({ message: "Invalid Blog ID.", status: "failed" });
		if (blog && title) {
			record.title = title;
			record.blog = blog;
			await record.save();

			return res
				.status(200)
				.json({ message: "Blogs Updated Successfully", status: "success" });
		} else {
			return res
				.status(200)
				.json({ message: "Please provide all fields", status: "failed" });
		}
	} catch (err) {
		return res
			.status(500)
			.json({ message: "some thing went wrong", status: "success" });
	}
});

router.get("/get", async (req, res) => {
	try {
		const response = await blogsModal.find().sort({ createdAt: -1 });
		if (response)
			return res
				.status(200)
				.json({ message: "Fetch All Blogs", status: "success", response });
		else
			return res.status(401).json({
				message: "failed to fetch blogs",
				status: "success",
				response: null,
			});
	} catch (err) {
		return res.status(500).json({
			message: "some thing went to wrong",
			status: "failed",
			response: null,
		});
	}
});

router.get("/getSingle/:blogId", async (req, res) => {
	try {
		const { blogId } = req.params;
		const response = await blogsModal.findOne({ _id: blogId });
		if (response)
			return res
				.status(200)
				.json({ message: "Fetch All Blogs", status: "success", response });
		else
			return res.status(401).json({
				message: "failed to fetch blogs",
				status: "success",
				response: null,
			});
	} catch (err) {
		return res.status(401).json({
			message: "failed to fetch blogs",
			status: "success",
			response: null,
		});
	}
});

module.exports = router;
