const { default: algosdk } = require("algosdk");
const { isAddress } = require("ethers/lib/utils");
const StellarSdk = require("stellar-sdk");
const TronWebNode = require("tronweb");
const litecore = require("bitcore-lib-ltc");
const bitcoin = require("bitcoinjs-lib");
const dogecore = require("bitcore-lib-doge");
const { Client } = require("@xchainjs/xchain-thorchain");
const { default: Keyring } = require("@polkadot/keyring");
const { PublicKey } = require("@solana/web3.js");

const evm = (address) => {
	const isValid = isAddress(address);
	return isValid;
};

const algo = (address) => {
	const isValid = algosdk.isValidAddress(address);
	return isValid;
};
const stellerWallet = (address) => {
	const isValid = StellarSdk.StrKey.isValidEd25519PublicKey(address);
	return isValid;
};
const tronWallet = (address) => {
	const isValid = TronWebNode.isAddress(address);
	return isValid;
};
const ltcWallet = (address) => {
	const isValid = litecore.Address.isValid(address, "livenet");
	return isValid;
};
const btcWallet = (address) => {
	try {
		bitcoin.address.toOutputScript(address);
		return true;
	} catch (error) {
		console.log(error.message, "error");
		return false;
	}
};
const dogewallet = (address) => {
	const isValid = dogecore.Address.isValid(address, "livenet");
	return isValid;
};
const thor = async (address) => {
	const providerUrl = "http://134.209.138.247:1317";
	const thorClient = new Client({
		thor: providerUrl,
	});
	const isValid = await thorClient.validateAddress(address);
	return isValid;
};

const polkadotWallet = (address) => {
	try {
		const keyring = new Keyring();

		keyring.decodeAddress(address);

		return true;
	} catch (error) {
		console.log(error.message, "error");
		return false;
	}
};

const solanaWallet = (address) => {
	try {
		const publicKey = new PublicKey(address);

		if (publicKey.toBase58() !== address) {
			console.log("Invalid address checksum.");
			return false;
		}
		return true;
	} catch (error) {
		console.log("Error:", error.message);
		return false;
	}
};

const walletVerifyFn = {
	BNB: evm,
	ETH: evm,
	MATIC: evm,
	AVAX: evm,
	EOS: evm,
	TRX: tronWallet,
	XLM: stellerWallet,
	SOL: solanaWallet,
	DOGE: dogewallet,
	LTC: ltcWallet,
	DOT: polkadotWallet,
	BTC: btcWallet,
	ALGO: algo,
	RUNE: thor,
	USDT: evm,
	USDC: evm,
	DAI: evm,
};
module.exports = walletVerifyFn;
