const express = require("express");
const router = express.Router();

const AdminFee = require("../modals/adminFee");
const trxRecord = require("../modals/trxRecord");
const midTransferFn = require("./utils/MidTransferFunctions");
const adminTransferFn = require("./utils/AdminTransferFunctions");
const confirmTransferFn = require("./utils/ConfirmTransferFunctions");
const coinMarketCapConvert = require("./utils/utils");
const kyc = require("../modals/kyc");

router.post("/exchange", async function (req, res) {
	try {
		const { txID } = req.body;
		let transactionRecord = await trxRecord.findOne({ txID: txID });
		if (!transactionRecord)
			return res.status(400).send("Invalid transaction ID");

		const usertxId = await kyc.findOne({ txId: txID });

		if (transactionRecord.status === "pending") {
			const bal = await confirmTransferFn[transactionRecord.currencyType.send](
				transactionRecord
			);
			if (+bal >= +transactionRecord.amount) {
				transactionRecord.status = "transferred";
				transactionRecord.save();
				return res.status(200).send("transferred");
			} else {
				return res.status(200).send("waiting");
			}
		} else if (transactionRecord.status === "transferred") {
			await midTransferFn[transactionRecord.currencyType.send](
				transactionRecord
			);
			let conversion = await coinMarketCapConvert(
				2781,
				transactionRecord.exchangeType.sendId,
				1
			);
			conversion = conversion?.price * transactionRecord.amount;
			if (conversion >= 500) {
				transactionRecord.status = "approval";
				transactionRecord.save();
				return res.status(200).send("approval");
			} else return res.status(200).send("middle");
		} else if (transactionRecord.status === "approval") {
			if (usertxId) {
				transactionRecord.status = "kyc";
				transactionRecord.save();
				return res.send("found");
			} else return res.send("not found");
		} else if (transactionRecord.status === "kyc") {
			return res.send("waiting for admin approval");
		} else if (transactionRecord.status === "rejected") {
			transactionRecord.send = transactionRecord.amount;
			transactionRecord.currencyType.send =
				transactionRecord.currencyType.receive;
			transactionRecord.save();
			await adminTransferFn[transactionRecord.currencyType.receive](
				transactionRecord
			);
			return res.send("rejected");
		} else if (transactionRecord.status === "approved") {
			transactionRecord.status = "middle";
			transactionRecord.save();
			return res.send("approved");
		} else if (transactionRecord.status === "middle") {
			if (transactionRecord.exchangeType === "float") {
				const converted = await coinMarketCapConvert(
					transactionRecord.exchangeType.receiveCurrecnyId,
					transactionRecord.exchangeType.sendCurrecnyId,
					transactionRecord.exchangeType.send
				);
				const feeRecord = await AdminFee.findOne({ title: "adminfee" });
				let percent = (feeRecord.fee / 100) * converted.price;
				let newPrice = converted.price - percent;
				transactionRecord.amount = newPrice;
				transactionRecord.save();
			}
			await adminTransferFn[transactionRecord.currencyType.receive](
				transactionRecord
			);
			return res.status(200).send("exchange");
		} else if (transactionRecord.status === "exchange") {
			return res.status(200).send("success");
		} else {
			return res.status(200).send("waiting");
		}
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
