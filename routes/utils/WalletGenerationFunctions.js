const ethers = require("ethers");
const TronWeb = require("tronweb");
const StellarSdk = require("stellar-sdk");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const bitcore = require("bitcore-lib-ltc");
const dogecore = require("bitcore-lib-doge");
const { Keypair, Account, PublicKey } = require("@solana/web3.js");
const { Keyring } = require("@polkadot/keyring");
const { bip39ToSeed, waitReady } = require("@polkadot/wasm-crypto");
const algosdk = require("algosdk");
const { Client } = require("@xchainjs/xchain-thorchain");
const { default: axios } = require("axios");
const Wallet = require("../../modals/generateWallet");

const evm = async (walletCount) => {
	const hdnode = ethers.utils.HDNode.fromMnemonic(process.env.MID_MNEMONIC);
	const path = "m/44'/60'/0'/0/";
	const walletNode = hdnode.derivePath(path + walletCount.toString());
	const wallet = walletNode.address;

	return wallet;
};

const btcWallet = async (walletCount) => {
	const path = `m/84'/1'/0/0/${walletCount}`;
	const seed = bip39.mnemonicToSeedSync(process.env.MID_MNEMONIC);
	const network = bitcoin.networks.bitcoin;
	const masterKey = bitcoin.bip32.fromSeed(seed, network);
	const { privateKey } = masterKey.derivePath(path);
	const { address } = bitcoin.payments.p2wpkh({
		pubkey: bitcoin.ECPair.fromPrivateKey(privateKey, { network }).publicKey,
		network,
	});

	return address;
};

const ltcWallet = async (walletCount) => {
	console.log('=====>INSIDE LTC FUNCTION ltcWallet');
	const seed = bip39.mnemonicToSeedSync(process.env.MID_MNEMONIC);
	const path = `m/84'/1'/0'/0/${walletCount}`;
	const hdPrivateKey = new bitcore.HDPrivateKey.fromSeed(
		seed,
		bitcore.Networks.livenet
	);
	const derivedPrivateKey = hdPrivateKey.deriveChild(path).privateKey;
	const publicKey = derivedPrivateKey.publicKey;
	const address = new bitcore.Address(
		publicKey,
		bitcore.Networks.livenet
	).toString();

	console.log('=====>address in LTC functions', address);

	return address;
};

const solanaWallet = async (walletCount) => {
	const path = `m/44'/501'/0'/${walletCount}`;
	const seed = await bip39.mnemonicToSeed(process.env.MID_MNEMONIC);
	const derivedSeed = bitcoin.bip32.fromSeed(seed).derivePath(path).privateKey;
	const keypair = Keypair.fromSeed(derivedSeed);

	const account = new Account(
		keypair.secretKey,
		"https://api.mainnet-beta.solana.com"
		// "https://api.testnet.solana.com"
	);

	const publicKey = new PublicKey(account.publicKey);
	const address = publicKey.toBase58();
	console.log(address);
	return address;
};

const stellerWallet = async (walletCount) => {
	const path = `m/44'/148'/0'/0/${walletCount}`;

	const seed = await bip39.mnemonicToSeed(process.env.MID_MNEMONIC);
	const root = bitcoin.bip32.fromSeed(seed);
	const child = root.derivePath(path);
	const keypair = StellarSdk.Keypair.fromRawEd25519Seed(child.privateKey);
	const publicKey = keypair.publicKey();

	await axios
		.get(`https://friendbot.stellar.org?addr=${publicKey}`)
		.then((response) => {
			console.log(response.data);
		});

	const address = publicKey;

	return address;
};

const tronWallet = (walletCount) => {
	const fullNode = "https://api.trongrid.io/";
	const solidityNode = "https://api.trongrid.io/";
	const eventServer = "https://api.trongrid.io/";
	const apiKey = process.env.TRON_API;

	const tronWeb = new TronWeb({
		fullHost: fullNode,
		headers: { "TRON-PRO-API-KEY": apiKey },
		solidityNode,
		eventServer,
	});

	const tronAddress = tronWeb.fromMnemonic(
		process.env.MID_MNEMONIC,
		`m/44'/195'/0'/0/${walletCount}`
	);

	return tronAddress.address;
};

const polkadotWallet = async (walletCount) => {
	await waitReady();
	const derivationPath = `m/44'/354'/0'/0/${walletCount}`;
	const seed = bip39ToSeed(process.env.MID_MNEMONIC);
	const keyring = new Keyring({ type: "sr25519", ss58Format: 0 });
	const derived = keyring.createFromUri(
		`sr25519//${seed.toString("hex")}//${derivationPath}`
	);
	console.log(derived.address);
	return derived.address;
};

const dogewallet = async (walletCount) => {
	const seed = bip39.mnemonicToSeedSync(process.env.MID_MNEMONIC);
	const path = `m/44'/3'/0'/0/${walletCount}`;
	const hdPrivateKey = new dogecore.HDPrivateKey.fromSeed(
		seed,
		dogecore.Networks.livenet
	);
	const derivedPrivateKey = hdPrivateKey.deriveChild(path).privateKey;
	const publicKey = derivedPrivateKey.publicKey;
	const address = new dogecore.Address(
		publicKey,
		dogecore.Networks.livenet
	).toString();
	console.log(address);
	return address;
};

const algo = (mnemonic) => {
	const account = algosdk.mnemonicToSecretKey(mnemonic);
	return account.addr;
};

const thor = async (walletCount) => {
	const mnemonic = process.env.MID_MNEMONIC;
	const providerUrl = "http://134.209.138.247:1317";
	const client = new Client({
		phrase: mnemonic,
		thor: providerUrl,
	});

	const address = await client.getAddress(walletCount);
	return address;
};

// const Wallet = async (walletCount) => {
// 	return address;
// };

const generateWalletFn = {
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

module.exports = generateWalletFn;
