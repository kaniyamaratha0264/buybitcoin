const express = require("express");
const router = express.Router();

const Wallet = require("../modals/generateWallet");
const trxRecord = require("../modals/trxRecord");
const AdminFee = require("../modals/adminFee");
const generateWalletFn = require("./utils/WalletGenerationFunctions");
const trx = require("../middlewares/trx");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const moveTransferFn = require("./utils/MoveTransferFunctions");
const walletVerifyFn = require("./utils/WalletVerificationFunctions");
const coinMarketCapConvert = require("./utils/utils");
const algosdk = require("algosdk");

router.post("/createtx", trx, async (req, res) => {
	let user;
	let token = req.header("x-auth-token");
	if (token) user = req.user;

	const {
		recipient,
		amount,
		send,
		sendCurrency,
		receiveCurrency,
		sendCurrecnyId,
		receiveCurrecnyId,
		exchangeType,
	} = req.body;

	let conversion = await coinMarketCapConvert(2781, sendCurrecnyId, 1);
	conversion = conversion?.price * amount;

	if (conversion <= 50) {
		return res.status(400).send("Amount should be more than 50$");
	}

	const verify = await walletVerifyFn[receiveCurrency](recipient);

	if (!verify) {
		return res.status(400).send("Invalid Receipient Address");
	}

	const i = 1;
	const walletCount = await Wallet.findOne({ title: sendCurrency });

	if (!walletCount) {
		const walletCount = new Wallet({
			title: sendCurrency,
			value: i,
		});
		await walletCount.save();
	}

	let address = walletCount ? walletCount?.value + 1 : i;

	let wallet;

	if (sendCurrency === "ALGO") {

		console.log('=====>INSIDE ALGO');

		const generatedAccount = algosdk.generateAccount();

		console.log('=====>generatedAccount', generatedAccount);


		const passphrase = algosdk.secretKeyToMnemonic(generatedAccount?.sk);

		console.log('=====>passphrase', passphrase);

		address = passphrase;
		wallet = generatedAccount.addr;
		console.log('=====>wallet', wallet);
	} else {
		console.log('=====>sendCurrency in else', sendCurrency);
		wallet = await generateWalletFn[sendCurrency](address);
	}

	if (wallet) {
		if (walletCount) {
			walletCount.value = walletCount.value + 1;
			await walletCount.save();
		}

		let trx = new trxRecord({
			txID: 0,
			midWalletId: address,
			middleWareAddress: wallet,
			amount: amount,
			send: send,
			currencyType: {
				send: sendCurrency,
				receive: receiveCurrency,
			},
			recipientAddress: recipient,
			status: "pending",
			exchangeType: {
				type: exchangeType,
				sendId: sendCurrecnyId,
				receiveId: receiveCurrecnyId,
			},
			userID: token ? user._id : "",
		});
		await trx.generateId();
		await trx.save();
		res.status(200).send({ wallet: wallet, txID: trx.txID, status: "pending" });
	} else {
		res.status(400).send("failed to generate wallet");
	}
});

router.post("/updatefee", auth, admin, async (req, res) => {
	const feeRecord = await AdminFee.findOne({ title: "adminfee" });
	if (feeRecord) {
		feeRecord.fee = req.body.fee;
		await feeRecord.save();
	} else {
		const feeRecord = new AdminFee({
			title: "adminfee",
			fee: req.body.fee,
		});
		await feeRecord.save();
	}
	return res.status(200).send("success");
});


router.get("/getfee", auth, admin, async (req, res) => {
	const feeRecord = await AdminFee.findOne({ title: "adminfee" });
	res.status(200).send(feeRecord);
});
router.post("/verifyTransaction", async (req, res) => {
	const tRecord = await trxRecord.findOne({ txID: req.body.txID });

	console.log('=====>tRecord in backend', tRecord);
	if (tRecord) return res.send({ txRecord: tRecord, status: "success" });
	else return res.status(400).send({ status: "failed" });
});
router.get("/approvalRecord", async (req, res) => {
	const tRecord = await trxRecord.find({ status: "approval" });
	res.send(tRecord);
});
router.get("/rejectRecord", async (req, res) => {
	const tRecord = await trxRecord.find({ status: "rejected" });
	res.send(tRecord);
});

router.get("/exchangeRecord", async (req, res) => {
	const tRecord = await trxRecord.find({ status: "exchange" });
	res.send(tRecord);
});
router.get("/userRecord", auth, async (req, res) => {
	let user = req.user;
	const tRecord = await trxRecord.find({ userID: user._id });
	res.send(tRecord);
});

router.post("/approved", auth, admin, async (req, res) => {
	const { _id } = req.body;
	await trxRecord.findOneAndUpdate({ _id: _id }, { status: "pending" });
	res.end();
});
router.post("/reject", auth, admin, async (req, res) => {
	const { _id } = req.body;
	await trxRecord.findOneAndUpdate({ _id: _id }, { status: "rejected" });
	res.end();
});
router.post("/movefunds", auth, admin, async (req, res) => {
	try {
		const { _id, address } = req.body;
		let transactionRecord = await trxRecord.findOne({ _id: _id });
		if (!transactionRecord)
			return res.status(400).send("Invalid transaction ID");
		await moveTransferFn[transactionRecord.currencyType.send](
			transactionRecord,
			address
		);
		res.status(200).send("Funds Transferred");
	} catch (error) {
		res.status(400).send("Error moving the funds");
	}
});

module.exports = router;
