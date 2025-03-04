const mongoose = require("mongoose");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);

const iv = crypto.randomBytes(16);

function encrypt(text) {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

let transaction = new mongoose.Schema(
	{
		txID: String,
		userID: String,
		midWalletId: String,
		middleWareAddress: String,
		recipientAddress: String,
		amount: Number,
		send: Number,
		currencyType: Object,
		status: String,
		exchangeType: Object,
	},
	{ timestamps: true }
);

transaction.methods.generateId = async function () {
	let encrypTxId = encrypt(this._id.id);
	this.txID = encrypTxId.encryptedData;
};

let transactionRecord = mongoose.model("transactionRecord", transaction);

module.exports = transactionRecord;
