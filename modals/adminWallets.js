const mongoose = require("mongoose");
const crypto = require("crypto");

function encrypt(text) {
	let cipher = crypto.createCipheriv(
		process.env.algorithm,
		Buffer.from(process.env.key, "hex"),
		Buffer.from(process.env.iv, "hex")
	);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString("hex");
}

function decryption(text) {
	let encryptedText = Buffer.from(text, "hex");

	let decipher = crypto.createDecipheriv(
		process.env.algorithm,
		Buffer.from(process.env.key, "hex"),
		Buffer.from(process.env.iv, "hex")
	);

	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}

let wallets = new mongoose.Schema(
	{
		title: {
			type: String,
			default: "wallets",
		},
		ALGORAND_ADMIN_MNEMONIC: String,
		ADMIN_MNEMONIC: String,
		ALGORAND_ADMIN_ADDRESS: String,
		EVM_ADMIN_ADDRESS: String,
		BTC_ADMIN_ADDRESS_ONE: String,
		BTC_ADMIN_ADDRESS_TWO: String,
		BTC_ADMIN_ADDRESS_THREE: String,
		LTC_ADMIN_ADDRESS: String,
		DOGE_ADMIN_ADDRESS: String,
		SOLANA_ADMIN_ADDRESS: String,
		TRON_ADMIN_ADDRESS: String,
		STELLER_ADMIN_ADDRESS: String,
		POLKADOT_ADMIN_ADDRESS: String,
		THOR_ADMIN_ADDRESS: String,
	},
	{ timestamps: true }
);

wallets.methods.encryption = async function () {
	let encryptData1 = encrypt(this.ALGORAND_ADMIN_MNEMONIC);
	this.ALGORAND_ADMIN_MNEMONIC = encryptData1;
	let encryptData2 = encrypt(this.ADMIN_MNEMONIC);
	this.ADMIN_MNEMONIC = encryptData2;
	let encryptData3 = encrypt(this.ALGORAND_ADMIN_ADDRESS);
	this.ALGORAND_ADMIN_ADDRESS = encryptData3;
	let encryptData4 = encrypt(this.EVM_ADMIN_ADDRESS);
	this.EVM_ADMIN_ADDRESS = encryptData4;
	let encryptData6 = encrypt(this.BTC_ADMIN_ADDRESS_ONE);
	this.BTC_ADMIN_ADDRESS_ONE = encryptData6;
	let encryptData7 = encrypt(this.BTC_ADMIN_ADDRESS_TWO);
	this.BTC_ADMIN_ADDRESS_TWO = encryptData7;
	let encryptData8 = encrypt(this.BTC_ADMIN_ADDRESS_THREE);
	this.BTC_ADMIN_ADDRESS_THREE = encryptData8;
	let encryptData9 = encrypt(this.LTC_ADMIN_ADDRESS);
	this.LTC_ADMIN_ADDRESS = encryptData9;
	let encryptData10 = encrypt(this.DOGE_ADMIN_ADDRESS);
	this.DOGE_ADMIN_ADDRESS = encryptData10;
	let encryptData11 = encrypt(this.SOLANA_ADMIN_ADDRESS);
	this.SOLANA_ADMIN_ADDRESS = encryptData11;
	let encryptData12 = encrypt(this.TRON_ADMIN_ADDRESS);
	this.TRON_ADMIN_ADDRESS = encryptData12;
	let encryptData13 = encrypt(this.STELLER_ADMIN_ADDRESS);
	this.STELLER_ADMIN_ADDRESS = encryptData13;
	let encryptData14 = encrypt(this.POLKADOT_ADMIN_ADDRESS);
	this.POLKADOT_ADMIN_ADDRESS = encryptData14;
	let encryptData15 = encrypt(this.THOR_ADMIN_ADDRESS);
	this.THOR_ADMIN_ADDRESS = encryptData15;
};

module.exports.adminWallets = mongoose.model("adminWallets", wallets);
module.exports.decryption = decryption;
