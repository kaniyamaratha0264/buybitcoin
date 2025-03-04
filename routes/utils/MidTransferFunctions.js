const { parseUnits, formatUnits, formatEther } = require("ethers/lib/utils");
const axios = require("axios");
const { ethers } = require("ethers");
const litecore = require("bitcore-lib-ltc");
const bitcoin = require("bitcoinjs-lib");
const web3 = require("@solana/web3.js");
const TronWeb = require("tronweb");
const StellarSdk = require("stellar-sdk");
const privateKeyFn = require("./PrivateKeyGeneration");
const dogecore = require("bitcore-lib-doge");
const algosdk = require("algosdk");
const {
	Client,
	DECIMAL,
	AssetRuneNative,
} = require("@xchainjs/xchain-thorchain");
const {
	useUSDTContract,
	useUSDCContract,
	useDAIContract,
	gasEstimationForAll,
} = require("../../contractAssets/hooks");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");
const { bip39ToSeed, waitReady } = require("@polkadot/wasm-crypto");
const { assetToBase, assetAmount } = require("@xchainjs/xchain-util");
const { adminWallets, decryption } = require("../../modals/adminWallets");

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
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	const adminKey = await privateKeyFn[transactionRecord.currencyType.send](
		0,
		ADMIN_MNEMONIC
	);

	const adminWallet = new ethers.Wallet(adminKey, ethProvider);

	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);

	const midWallet = new ethers.Wallet(middleprivateKey, ethProvider);
	const adminConnect = adminWallet.connect(ethProvider);
	let Contract = getContract(
		middleprivateKey,
		transactionRecord.currencyType.send
	);

	if (Contract) {
		let bal = await Contract.balanceOf(midWallet.address);

		let data = [adminWallet.address, bal];
		let fn = Contract.estimateGas.transfer;
		let fee = await gasEstimationForAll(adminWallet.address, fn, data);

		let gasPrice = await ethProvider.getGasPrice();

		let transactionFee = gasPrice * fee;

		transactionFee = formatEther(transactionFee);

		const transaction = {
			to: midWallet.address,
			value: parseUnits(transactionFee).toString(),
			gasPrice: gasPrice,
		};

		let estimatedGas = await adminWallet.estimateGas(transaction);
		transaction.gasLimit = estimatedGas;

		const tx = await adminConnect.sendTransaction(transaction);
		await tx.wait();

		gasPrice = await ethProvider.getGasPrice();
		fee = await gasEstimationForAll(adminWallet.address, fn, data);

		const tx1 = await Contract.transfer(...data, {
			gasPrice: gasPrice,
			gasLimit: fee,
		});
		await tx1.wait();

		transactionRecord.status = "middle";
		transactionRecord.save();

		console.log(tx1, "tx");
	}
};

const evm = async (transactionRecord) => {
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);
	const midWallet = new ethers.Wallet(
		middleprivateKey,
		provider[transactionRecord.currencyType.send]
	);
	const midConnect = midWallet.connect(
		provider[transactionRecord.currencyType.send]
	);

	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let EVM_ADMIN_ADDRESS = decryption(adminWallet1.EVM_ADMIN_ADDRESS);

	const receiverAddress = EVM_ADMIN_ADDRESS;

	let bal = await midWallet.getBalance();
	bal = formatUnits(bal);

	let gasPrice = await midWallet.getGasPrice();

	const transactionTest = {
		to: receiverAddress,
		value: parseUnits(bal.toString()),
	};

	let estimatedGas = await midWallet.estimateGas(transactionTest);

	let transactionFee = gasPrice * estimatedGas;
	transactionFee = formatEther(transactionFee);
	transactionFee = +transactionFee + 0.001;
	bal = bal - transactionFee;
	bal = parseUnits(bal.toString());

	if (estimatedGas && gasPrice && bal) {
		const transaction = {
			to: receiverAddress,
			value: bal,
			gasPrice: gasPrice,
			gasLimit: estimatedGas,
		};
		const tx = await midConnect.sendTransaction(transaction);
		await tx.wait();
		transactionRecord.status = "middle";
		transactionRecord.save();
		console.log(tx, "tx from mid wallet");
	}
};

const btc = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let BTC_ADMIN_ADDRESS_ONE = decryption(adminWallet1.BTC_ADMIN_ADDRESS_ONE);
	const sourceAddress = transactionRecord.middleWareAddress;
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);

	const adminAddress = BTC_ADMIN_ADDRESS_ONE;
	// Get the current recommended fee rates
	const apiUrlFee = "https://mempool.space/api/v1/fees/recommended";
	const feeData = await axios.get(apiUrlFee).catch((error) => {
		console.error(`Error estimating fee: ${error.response.data.error}`);
	});
	const feeRates = feeData.data;
	const feeRate = feeRates.fastestFee;

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
	const totalInput = inputs.reduce((acc, input) => acc + input.value, 0);
	// Create a PSBT (Partially Signed Bitcoin Transaction)
	const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });

	// Add the inputs to the PSBT
	inputs.forEach((input) => {
		psbt.addInput({
			hash: input.tx_hash,
			index: input.tx_output_n,
			witnessUtxo: {
				script: bitcoin.address.toOutputScript(
					sourceAddress,
					bitcoin.networks.bitcoin
				),
				value: input.value,
			},
		});
	});

	// Estimate and set the fee based on the recommended fee rate
	const fee = Math.ceil(psbt.__CACHE.__TX.virtualSize() * feeRate) * 4;

	console.log(totalInput, fee, totalInput - fee, "send");
	// Add the output to the PSBT

	psbt.addOutput({
		address: adminAddress,
		value: totalInput - fee,
	});
	psbt.txFee = fee;

	// Sign the inputs with the private key of the source address
	inputs.forEach((input, index) => {
		psbt.signInput(index, middleprivateKey);
	});

	// Finalize the PSBT
	psbt.finalizeAllInputs();

	// Build and broadcast the transaction to the network
	const txHex = psbt.extractTransaction().toHex();

	await axios
		.post(
			`https://api.blockcypher.com/v1/btc/main/txs/push?token=${process.env.BLOCKCYPHER}`,
			{ tx: txHex }
		)
		.then((response) => {
			console.log(
				`Transaction broadcasted with txid: ${response.data.tx.hash}`
			);
			transactionRecord.status = "middle";
			transactionRecord.save();
		})
		.catch((error) => {
			console.error(
				`Error broadcasting transaction: ${error.response.data.error}`
			);
		});
};
const sol = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let SOLANA_ADMIN_ADDRESS = decryption(adminWallet1.SOLANA_ADMIN_ADDRESS);
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);
	const sourceAddress = transactionRecord.middleWareAddress;
	const adminAddress = SOLANA_ADMIN_ADDRESS;
	const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
	let sourceKey = new web3.PublicKey(sourceAddress);
	let destKey = new web3.PublicKey(adminAddress);
	const balance = await connection.getBalance(sourceKey);
	const rent = await connection.getMinimumBalanceForRentExemption(0);
	const rentBuffer = rent * 1.01;

	const amount = balance - rentBuffer;
	const transaction = new web3.Transaction().add(
		web3.SystemProgram.transfer({
			fromPubkey: sourceKey,
			toPubkey: destKey,
			lamports: Math.floor(amount),
		})
	);

	// Sign transaction, broadcast, and confirm
	const signature = await web3.sendAndConfirmTransaction(
		connection,
		transaction,
		[middleprivateKey]
	);
	transactionRecord.status = "middle";
	transactionRecord.save();
	console.log("SIGNATURE", signature);
};

const tron = async (transactionRecord) => {
	try {
		let adminWallet1 = await adminWallets.findOne({
			title: "wallets",
		});
		let TRON_ADMIN_ADDRESS = decryption(adminWallet1.TRON_ADMIN_ADDRESS);
		const middleprivateKey = await privateKeyFn[
			transactionRecord.currencyType.send
		](transactionRecord.midWalletId, process.env.MID_MNEMONIC);
		const midAddress = transactionRecord.middleWareAddress;
		const adminAddress = TRON_ADMIN_ADDRESS;
		const fullNode = "https://api.trongrid.io";
		const solidityNode = "https://api.trongrid.io";
		const eventServer = "https://api.trongrid.io";
		const apiKey = process.env.TRON_API; // your private key
		const tronWeb = new TronWeb({
			fullHost: fullNode,
			headers: { "TRON-PRO-API-KEY": apiKey },
			solidityNode,
			eventServer,
		});
		const bal = await tronWeb.trx.getBalance(midAddress);

		tronWeb.trx.getChainParameters().then(async (param) => {
			const energyFee = param[11].value;
			const transactionSize = 120;
			const gasFee = energyFee * transactionSize;

			try {
				const tx = await tronWeb.trx.sendTransaction(
					adminAddress,
					bal - gasFee,
					middleprivateKey
				);
				transactionRecord.status = "middle";
				transactionRecord.save();
				console.log(tx);
			} catch (error) {
				console.log(error);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const steller = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let STELLER_ADMIN_ADDRESS = decryption(adminWallet1.STELLER_ADMIN_ADDRESS);
	const middleprivateKey = await privateKeyFn[
		transactionRecord.currencyType.send
	](transactionRecord.midWalletId, process.env.MID_MNEMONIC);
	const midAddress = transactionRecord.middleWareAddress;
	const adminAddress = STELLER_ADMIN_ADDRESS;
	const sourceKeypair = StellarSdk.Keypair.fromSecret(middleprivateKey);
	const server = new StellarSdk.Server("https://horizon.stellar.org");

	const account = await server.loadAccount(midAddress);
	let balance = account.balances.find(
		(balance) => balance.asset_type === "native"
	).balance;

	console.log(balance, "balance");

	const fee = await server.fetchBaseFee();

	console.log(fee, "fee");

	balance = balance - 2;
	balance = balance.toFixed(7);

	console.log(balance, "balance");

	const transaction = new StellarSdk.TransactionBuilder(account, {
		fee,
		networkPassphrase: StellarSdk.Networks.PUBLIC,
		// networkPassphrase: StellarSdk.Networks.TESTNET,
	})
		.addOperation(
			// This operation sends the destination account XLM
			StellarSdk.Operation.payment({
				destination: adminAddress,
				asset: StellarSdk.Asset.native(),
				amount: balance.toString(),
			})
		)
		.setTimeout(30)
		.build();

	transaction.sign(sourceKeypair);

	// Let's see the XDR (encoded in base64) of the transaction we just built
	console.log(transaction.toEnvelope().toXDR("base64"));

	// Submit the transaction to the Horizon server. The Horizon server will then
	// submit the transaction into the network for us.
	try {
		const transactionResult = await server.submitTransaction(transaction);
		console.log(JSON.stringify(transactionResult, null, 2));
		console.log("\nSuccess! View the transaction at: ");
		console.log(transactionResult._links.transaction.href);
		transactionRecord.status = "middle";
		transactionRecord.save();
	} catch (e) {
		console.log("An error has occured:");
		console.log(e.response.data.extras.result_codes.operations);
	}
};

const ltc = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let LTC_ADMIN_ADDRESS = decryption(adminWallet1.LTC_ADMIN_ADDRESS);
	const midAddress = transactionRecord.middleWareAddress;
	const adminAddress = LTC_ADMIN_ADDRESS;

	const midPrivateKey = await privateKeyFn[transactionRecord.currencyType.send](
		transactionRecord.midWalletId,
		process.env.MID_MNEMONIC
	);

	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/ltc/main/addrs/${midAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	const inputs = data?.data.txrefs;
	const utxos = inputs.map((tx) => {
		return {
			txId: tx.tx_hash,
			outputIndex: tx.tx_output_n,
			script: litecore.Script.fromAddress(midAddress).toHex(),
			satoshis: Math.floor(tx.value),
		};
	});
	let amount = utxos.reduce((acc, utxo) => acc + utxo.satoshis, 0);

	const transaction = new litecore.Transaction()
		.from(utxos)
		.to(adminAddress, amount)
		.sign(midPrivateKey);
	const transactionData = transaction.toBuffer();
	let transactionSize = transactionData.length;
	transactionSize = transactionSize * 10;

	const transaction1 = new litecore.Transaction()
		.from(utxos)
		.to(adminAddress, amount - transactionSize)
		.fee(transactionSize)
		.sign(midPrivateKey);

	await axios
		.post(
			`https://api.blockcypher.com/v1/ltc/main/txs/push?token=${process.env.BLOCKCYPHER}`,
			{ tx: transaction1.toString() }
		)
		.then((response) => {
			console.log(
				`Transaction broadcasted with txid: ${response.data.tx.hash}`
			);
			transactionRecord.status = "middle";
			transactionRecord.save();
		})
		.catch((error) => {
			console.error(
				`Error broadcasting transaction: ${error.response.data.error}`
			);
		});
};

const polkadot = async (transactionRecord) => {
	try {
		await waitReady();
		let adminWallet1 = await adminWallets.findOne({
			title: "wallets",
		});
		let POLKADOT_ADMIN_ADDRESS = decryption(
			adminWallet1.POLKADOT_ADMIN_ADDRESS
		);
		const adminAddress = POLKADOT_ADMIN_ADDRESS;
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
		console.log(balance, "balance");
		const keyring = new Keyring({ type: "sr25519" });
		const seed = bip39ToSeed(process.env.MID_MNEMONIC);
		const derivationPath = `m/44'/354'/0'/0/${transactionRecord.midWalletId}`;
		const midPair = keyring.addFromUri(
			`sr25519//${seed.toString("hex")}//${derivationPath}`
		);

		// Get the nonce for the admin key
		const { nonce, era } = await api.query.system.account(midAddress);

		const info = await api.tx.balances
			.transfer(adminAddress, balance)
			.paymentInfo(midPair.address);

		// log relevant info, partialFee is Balance, estimated for current
		console.log(`
	  class=${info.class.toString()},
	  weight=${info.weight.toString()},
	  partialFee=${info.partialFee.toNumber()}
	`);
		const fee = info.partialFee.toNumber();
		balance = balance - fee;
		console.log(fee, balance, "rtgyuhjikml");

		// Do the transfer and track the actual status
		api.tx.balances
			.transfer(adminAddress, balance)
			.signAndSend(midPair, { nonce, era, fee }, ({ status }) => {
				console.log("Transaction status:", status.type);

				console.log("Finalized block hash", status.asFinalized.toHex());
				transactionRecord.status = "middle";
				transactionRecord.save();
			});
	} catch (err) {
		console.log(err);
	}
};

const doge = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let DOGE_ADMIN_ADDRESS = decryption(adminWallet1.DOGE_ADMIN_ADDRESS);
	const midAddress = transactionRecord.middleWareAddress;
	const adminAddress = DOGE_ADMIN_ADDRESS;

	const midPrivateKey = await privateKeyFn[transactionRecord.currencyType.send](
		transactionRecord.midWalletId,
		process.env.MID_MNEMONIC
	);

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
	// let amount = 0.1 * 100000000;

	console.log(amount, "amount");
	const transaction = new dogecore.Transaction()
		.from(utxos)
		.to(adminAddress, amount)
		// .change(midAddress)
		.sign(midPrivateKey);

	// Deduct transaction fee from amount to send
	const fee = transaction._estimateFee();
	const totalAmountToSend = amount - fee;
	console.log(totalAmountToSend, fee, "totalAmountToSend");

	const transaction1 = new dogecore.Transaction()
		.from(utxos)
		.to(adminAddress, totalAmountToSend)
		// .change(midAddress)
		.fee(fee)
		.sign(midPrivateKey);

	console.log(transaction1.serialize());

	let input = JSON.stringify({
		data: {
			item: {
				signedTransactionHex: transaction1.serialize(),
			},
		},
	});

	axios
		.post(
			`https://api.blockcypher.com/v1/doge/main/txs/push?token=${process.env.BLOCKCYPHER}`,
			{ tx: input }
		)
		.then((response) => {
			console.log(
				`Transaction broadcasted with txid: ${response.data.tx.hash}`
			);
			transactionRecord.status = "middle";
			transactionRecord.save();
		})
		.catch((error) => {
			console.error(
				`Error broadcasting transaction: ${error.response.data.error}`
			);
		});
};

const algoTransfer = async (transactionRecord) => {
	try {
		let adminWallet1 = await adminWallets.findOne({
			title: "wallets",
		});
		let ALGORAND_ADMIN_ADDRESS = decryption(
			adminWallet1.ALGORAND_ADMIN_ADDRESS
		);
		const adminAddress = ALGORAND_ADMIN_ADDRESS;

		const midAddress = transactionRecord.middleWareAddress;

		const midPrivateKey = await privateKeyFn[
			transactionRecord.currencyType.send
		](transactionRecord.midWalletId);
		const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
		const algodPort = "";
		let algodToken = {
			"X-Api-Key": process.env.ALGO_API_KEY,
		};

		const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
		const acctInfo = await algodClient.accountInformation(midAddress).do();
		console.log(`Account balance: ${acctInfo.amount} microAlgos`);
		const note = new Uint8Array(Buffer.from("hello woorld"));
		// Calculate the fee
		const suggestedParams = await algodClient.getTransactionParams().do();

		const ptxn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			from: midAddress,
			suggestedParams,
			to: adminAddress,
			amount: acctInfo.amount,
			note: note,
		});

		const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			from: midAddress,
			suggestedParams,
			to: adminAddress,
			amount: acctInfo.amount - ptxn1.fee - 100000,
			note: note,
		});
		const signedTxn = ptxn.signTxn(midPrivateKey);
		const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
		const result = await algosdk.waitForConfirmation(algodClient, txId, 4);
		console.log(result);
		console.log(`Transaction Information: ${result.txn}`);
		console.log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);
		transactionRecord.status = "middle";
		transactionRecord.save();
	} catch (error) {
		console.log(e);
	}
};
const transferRune = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let THOR_ADMIN_ADDRESS = decryption(adminWallet1.THOR_ADMIN_ADDRESS);

	const mnemonic = process.env.MID_MNEMONIC;

	const midAddress = transactionRecord.middleWareAddress;
	const adminAddress = THOR_ADMIN_ADDRESS;

	const providerUrl = "http://138.68.125.107:1317";
	const thorClient = new Client({
		network: "mainnet",
		phrase: mnemonic,
		thor: providerUrl,
	});
	const amountToTransfer = await thorClient.getBalance(midAddress);
	amountToTransfer = amountToTransfer[0].amount.amount() / 100000000 - 1;
	let amount = assetToBase(assetAmount(amountToTransfer, DECIMAL));
	try {
		const txid = await thorClient.transfer({
			amount: amount,
			recipient: adminAddress,
			memo: "test",
			asset: AssetRuneNative,
			walletIndex: transactionRecord.midWalletId,
		});
		console.log(`Transaction sent: ${JSON.stringify(txid)}`);
		transactionRecord.status = "middle";
		transactionRecord.save();
	} catch (error) {
		console.log(`Caught ${error}`);
	}
};
const midTransferFn = {
	BNB: evm,
	ETH: evm,
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

module.exports = midTransferFn;
