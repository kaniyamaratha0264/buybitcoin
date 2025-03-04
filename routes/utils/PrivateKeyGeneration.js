const ethers = require("ethers");
const TronWeb = require("tronweb");
const StellarSdk = require("stellar-sdk");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const bitcore = require("bitcore-lib-ltc");
const { Keypair } = require("@solana/web3.js");
const { axios } = require("axios");
const dogecore = require("bitcore-lib-doge");
const algosdk = require("algosdk");

const evm = async (walletCount, mnemonic) => {
	const hdnode = ethers.utils.HDNode.fromMnemonic(mnemonic);
	const path = "m/44'/60'/0'/0/";
	const walletNode = hdnode.derivePath(path + walletCount.toString());
	const privateKey = walletNode.privateKey;

	return privateKey;
};

const btcWallet = async (walletCount, mnemonic) => {
	const path = `m/84'/1'/0/0/${walletCount}`;
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const network = bitcoin.networks.bitcoin;

	const masterKey = bitcoin.bip32.fromSeed(seed, network);
	const { privateKey } = masterKey.derivePath(path);
	const private = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"));

	return private;
};

const ltcWallet = async (walletCount, mnemonic) => {
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const path = `m/84'/1'/0'/0/${walletCount}`;
	const hdPrivateKey = new bitcore.HDPrivateKey.fromSeed(
		seed,
		bitcore.Networks.livenet
	);
	const derivedPrivateKey = hdPrivateKey.deriveChild(path).privateKey;

	return derivedPrivateKey.toString();
};

const dogewallet = async (walletCount, mnemonic) => {
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const path = `m/44'/3'/0'/0/${walletCount}`;
	const hdPrivateKey = new dogecore.HDPrivateKey.fromSeed(
		seed,
		dogecore.Networks.livenet
	);
	const derivedPrivateKey = hdPrivateKey.deriveChild(path).privateKey;

	return derivedPrivateKey.toString();
};

const solanaWallet = async (walletCount, mnemonic) => {
	const path = `m/44'/501'/0'/${walletCount}`;
	const seed = await bip39.mnemonicToSeed(mnemonic);
	const derivedSeed = bitcoin.bip32.fromSeed(seed).derivePath(path).privateKey;
	const keypair = Keypair.fromSeed(derivedSeed);

	return keypair;
};

const stellerWallet = async (walletCount, mnemonic) => {
	const path = `m/44'/148'/0'/0/${walletCount}`;

	const seed = await bip39.mnemonicToSeed(mnemonic);
	const root = bitcoin.bip32.fromSeed(seed);
	const child = root.derivePath(path);
	const keypair = StellarSdk.Keypair.fromRawEd25519Seed(child.privateKey);

	const secret = keypair.secret();

	return secret;
};

const tronWallet = (walletCount, mnemonic) => {
	const fullNode = "https://api.trongrid.io/";
	const solidityNode = "https://api.trongrid.io/";
	const eventServer = "https://api.trongrid.io/";
	// Define your API Key from TronGrid
	const apiKey = process.env.TRON_API;

	// Create an instance of TronWeb with the API Key
	const tronWeb = new TronWeb({
		fullHost: fullNode,
		headers: { "TRON-PRO-API-KEY": apiKey },
		solidityNode,
		eventServer,
	});

	const tronAddress = tronWeb.fromMnemonic(
		mnemonic,
		`m/44'/195'/0'/0/${walletCount}`
	);

	return tronAddress.privateKey.substring(2);
};

const algo = (mnemonic) => {
	const account = algosdk.mnemonicToSecretKey(mnemonic);
	return account.sk;
};

const thor = async (mnemonic) => {
	return mnemonic;
};

const privateKeyFn = {
	BNB: evm,
	ETH: evm,
	EOS: evm,
	MATIC: evm,
	AVAX: evm,
	TRX: tronWallet,
	XLM: stellerWallet,
	SOL: solanaWallet,
	DOGE: dogewallet,
	LTC: ltcWallet,
	BTC: btcWallet,
	ALGO: algo,
	RUNE: thor,
	USDT: evm,
	USDC: evm,
	DAI: evm,
};

module.exports = privateKeyFn;
