const express = require("express");
var router = express.Router();

const kyc = require("../modals/kyc");
const trxRecord = require("../modals/trxRecord");

router.post("/", async (req, res) => {
	try {
		const { txId, email, name, address, img1url, img2url, img3url } = req.body;

		let transactionRecord = await trxRecord.findOne({ txID: txId });
		let user = new kyc({
			txId: txId,
			name: name,
			email: email,
			address: address,
			img1: img1url,
			img2: img2url,
			img3: img3url,
		});
		await user.save();
		transactionRecord.status = "approval";
		res.status(200).send({ message: "kyc successfully uploaded to db" });
	} catch {
		res.status(400).send({ message: "Faild to uploading kyc in db" });
	}
});

router.get("/", async (req, res) => {
	const { id } = req.query;
	const usertxId = await kyc.findOne({ txId: id });
	res.send(usertxId);
});

module.exports = router;
