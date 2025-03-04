const { formatUnits } = require("ethers/lib/utils");
const axios = require("axios");
const { ethers } = require("ethers");
const litecore = require("bitcore-lib-ltc");
const web3 = require("@solana/web3.js");
const TronWeb = require("tronweb");
const StellarSdk = require("stellar-sdk");
const algosdk = require("algosdk");
const { Client, DECIMAL } = require("@xchainjs/xchain-thorchain");
const { assetToBase, assetAmount } = require("@xchainjs/xchain-util");
const dogecore = require("bitcore-lib-doge");
const {
	useUSDTContract,
	useUSDCContract,
	useDAIContract,
} = require("../../contractAssets/hooks");
const { ApiPromise, WsProvider } = require("@polkadot/api");

const privateKeyFn = require("./PrivateKeyGeneration");

const ethProvider = new ethers.providers.JsonRpcProvider(
	"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);
const bnbProvider = new ethers.providers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org"
);
const eosProvider = new ethers.providers.JsonRpcProvider(
	"https://api.evm.eosnetwork.com"
);
const maticProvider = new ethers.providers.JsonRpcProvider(
	"https://polygon-rpc.com"
);
const avaxProvider = new ethers.providers.JsonRpcProvider(
	"https://api.avax.network/ext/bc/C/rpc"
);
const provider = {
	ETH: ethProvider,
	BNB: bnbProvider,
	EOS: eosProvider,
	MATIC: maticProvider,
	AVAX: avaxProvider,
};
const TokenContract = {
	USDT: useUSDTContract,
	USDC: useUSDCContract,
	DAI: useDAIContract,
};

const getContract = (middleprivateKey, tokenType) => {
	try {
		let signer = new ethers.Wallet(middleprivateKey, ethProvider);
		let Contract = TokenContract[tokenType](signer);
		return Contract;
	} catch (e) {
		console.log(e);
	}
};
const contractEVM = async (transactionRecord) => {
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);
	const midWallet = new ethers.Wallet(middleprivateKey, ethProvider);

	const Contract = getContract(
		middleprivateKey,
		transactionRecord.currencyType.send
	);

	if (Contract) {
		let bal = await Contract.balanceOf(midWallet.address);
		const decimals = await Contract.decimals();
		bal = formatUnits(bal, +decimals);

		return bal;
	}
};

const evm = async (transactionRecord) => {


	console.log('=====>evm');
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);

	console.log('=====>middleprivateKey', middleprivateKey);

	console.log('=====>provider[transactionRecord.currencyType.send]', provider[transactionRecord.currencyType.send]);

	const midWallet = new ethers.Wallet(
		middleprivateKey,
		provider[transactionRecord.currencyType.send]
	);

	console.log('=====>midWallet', midWallet);

	let bal = await midWallet.getBalance();
	console.log('=====>bal bef', bal);
	bal = formatUnits(bal);

	console.log('=====>bal', bal);

	return bal;
};

const sol = async (transactionRecord) => {
	const sourceAddress = transactionRecord.middleWareAddress;
	const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
	sourceKey = new web3.PublicKey(sourceAddress);

	const bal = await connection.getBalance(sourceKey);
	return bal;
};

const tron = async (transactionRecord) => {
	try {
		const sourceAddress = transactionRecord.middleWareAddress;
		const fullNode = "https://api.trongrid.io";
		const solidityNode = "https://api.trongrid.io";
		const eventServer = "https://api.trongrid.io";
		const apiKey = process.env.TRON_API;
		const tronWeb = new TronWeb({
			fullHost: fullNode,
			headers: { "TRON-PRO-API-KEY": apiKey },
			solidityNode,
			eventServer,
		});
		const bal = await tronWeb.trx.getBalance(sourceAddress);

		return Math.floor(bal / 1000000);
	} catch (error) {
		console.log(error);
	}
};

const steller = async (transactionRecord) => {
	const sourceAddress = transactionRecord.middleWareAddress;
	// const server = new StellarSdk.Server("https://horizon-testnet.stellar.org"); // For testnet
	const server = new StellarSdk.Server("https://horizon.stellar.org"); // For mainnet

	const account = await server.loadAccount(sourceAddress);
	let balance = account.balances.find(
		(balance) => balance.asset_type === "native"
	).balance;

	return balance;
};

const ltc = async (transactionRecord) => {
	const midAddress = transactionRecord.middleWareAddress;

	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/ltc/main/addrs/${midAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	console.log('=====>data', data);

	const inputs = data?.data.txrefs;
	console.log('=====>inputs', inputs);

	const utxos = inputs?.map((tx) => {
		return {
			txId: tx.tx_hash,
			outputIndex: tx.tx_output_n,
			script: litecore.Script.fromAddress(midAddress).toHex(),
			satoshis: Math.floor(tx.value),
		};
	});
	let amount = utxos?.reduce((acc, utxo) => acc + utxo.satoshis, 0);
	amount = amount / 100000000;
	return amount.toFixed(4);
};

const polkadot = async (transactionRecord) => {
	try {
		await waitReady();
		const midAddress = transactionRecord.middleWareAddress;

		// Create the API and wait until ready
		const provider = new WsProvider("wss://rpc.polkadot.io");
		const api = await ApiPromise.create({
			provider,
		});
		let {
			data: { free: balance },
		} = await api.query.system.account(midAddress);
		balance = balance.toNumber();
		balance = (balance / 1000000000000).toFixed(4);
		console.log(balance, "balance");

		return balance;
	} catch (err) {
		console.log(err);
	}
};

const doge = async (transactionRecord) => {
	const midAddress = transactionRecord.middleWareAddress;

	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/doge/main/addrs/${midAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	const inputs = data?.data.txrefs;
	const utxos = inputs.map((tx) => {
		return {
			txId: tx.tx_hash,
			outputIndex: tx.tx_output_n,
			script: dogecore.Script.fromAddress(midAddress).toHex(),
			satoshis: Math.floor(tx.value * 100000000),
		};
	});
	let amount = utxos.reduce((acc, utxo) => acc + utxo.satoshis, 0);
	amount = (amount / 100000000).toFixed(4);
	console.log(amount, "amount");

	return amount;
};
const btc = async (transactionRecord) => {
	// Source and destination bech32 addresses
	const sourceAddress = transactionRecord.middleWareAddress;

	// Get the inputs of the source address
	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/btc/main/addrs/${sourceAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	const inputs = data?.data.txrefs;

	// Calculate the total input value
	let totalInput = inputs.reduce((acc, input) => acc + input.value, 0);

	totalInput = totalInput / 100000000;

	return totalInput;
};

const algoTransfer = async (transactionRecord) => {
	try {
		const midAddress = transactionRecord.middleWareAddress;

		const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
		const algodPort = "";
		let algodToken = {
			"X-Api-Key": process.env.ALGO_API_KEY,
		};

		const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
		const acctInfo = await algodClient.accountInformation(midAddress).do();
		console.log(`Account balance: ${acctInfo.amount} microAlgos`);

		return acctInfo.amount;
	} catch (error) {
		console.log(error);
	}
};

const transferRune = async (transactionRecord) => {
	const mnemonic = process.env.MID_MNEMONIC;

	const midAddress = transactionRecord.middleWareAddress;

	const providerUrl = "http://138.68.125.107:1317";
	const thorClient = new Client({
		network: "mainnet",
		phrase: mnemonic,
		thor: providerUrl,
	});
	const amountToTransfer = await thorClient.getBalance(midAddress);

	let amount = assetToBase(assetAmount(amountToTransfer, DECIMAL));

	return amount;
};
const confirmTransferFn = {
	ETH: evm,
	BNB: evm,
	EOS: evm,
	MATIC: evm,
	AVAX: evm,
	TRX: tron,
	XLM: steller,
	SOL: sol,
	LTC: ltc,
	DOGE: doge,
	DOT: polkadot,
	BTC: btc,
	ALGO: algoTransfer,
	RUNE: transferRune,
	USDT: contractEVM,
	USDC: contractEVM,
	DAI: contractEVM,
};

module.exports = confirmTransferFn;
