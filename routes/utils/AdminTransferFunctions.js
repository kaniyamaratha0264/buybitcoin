const { parseUnits } = require("ethers/lib/utils");
const axios = require("axios");
const { ethers } = require("ethers");
const { formatUnits } = require("ethers/lib/utils");
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
	const adminKey = await privateKeyFn[transactionRecord.currencyType.receive](
		0,
		ADMIN_MNEMONIC
	);
	const Contract = getContract(
		adminKey,
		transactionRecord.currencyType.receive
	);
	if (Contract) {
		const decimals = await Contract.decimals();
		let bal = transactionRecord.send;
		let data = [
			transactionRecord.recipientAddress,
			parseUnits(bal.toString(), +decimals).toString(),
		];
		let fn = Contract.estimateGas.transfer;

		const tx1 = await Contract.transfer(...data, {
			gasLimit: gasEstimationForAll(
				transactionRecord.recipientAddress,
				fn,
				data
			),
		});
		await tx1.wait();

		transactionRecord.status = "exchange";
		transactionRecord.save();

		console.log(tx1, "tx");
	}
};

const evm = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	const adminKey = await privateKeyFn[transactionRecord.currencyType.receive](
		0,
		ADMIN_MNEMONIC
	);
	const adminWallet = new ethers.Wallet(
		adminKey.toString(),
		provider[transactionRecord.currencyType.receive]
	);

	const adminConnect = adminWallet.connect(
		provider[transactionRecord.currencyType.receive]
	);

	let bal = transactionRecord.send;

	bal = parseUnits(bal.toString());

	let gasPrice = await adminWallet.getGasPrice();

	const transactionTest = {
		to: transactionRecord.recipientAddress,
		value: bal,
		gasPrice: gasPrice,
	};

	let estimatedGas = await adminWallet.estimateGas(transactionTest);

	if (estimatedGas && gasPrice && bal) {
		const transaction = {
			to: transactionRecord.recipientAddress,
			value: bal,
			gasPrice: gasPrice,
			gasLimit: estimatedGas,
		};

		const tx = await adminConnect.sendTransaction(transaction);
		await tx.wait();

		transactionRecord.status = "exchange";
		transactionRecord.save();

		console.log(tx, "tx from admin");
	}
};

const btc = async (transactionRecord) => {
	try {
		let adminWallet1 = await adminWallets.findOne({
			title: "wallets",
		});
		let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
		let BTC_ADMIN_ADDRESS_ONE = decryption(adminWallet1.BTC_ADMIN_ADDRESS_ONE);
		let BTC_ADMIN_ADDRESS_TWO = decryption(adminWallet1.BTC_ADMIN_ADDRESS_TWO);
		let BTC_ADMIN_ADDRESS_THREE = decryption(
			adminWallet1.BTC_ADMIN_ADDRESS_THREE
		);
		const adminPrivateKey = await privateKeyFn[
			transactionRecord.currencyType.receive
		](0, ADMIN_MNEMONIC);

		// Get the current recommended fee rates
		const apiUrlFee = "https://mempool.space/api/v1/fees/recommended";
		const feeData = await axios.get(apiUrlFee).catch((error) => {
			console.error(`Error estimating fee: ${error.response.data.error}`);
		});
		const feeRates = feeData.data;
		const feeRate = feeRates.fastestFee;

		let adminAddress;
		let totalInput;
		let inputs;

		try {
			adminAddress = BTC_ADMIN_ADDRESS_ONE;
			// Get the inputs of the source address
			const data = await axios
				.get(
					`https://api.blockcypher.com/v1/btc/main/addrs/${adminAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
				)
				.catch((error) => {
					console.error(`Error fetching inputs: ${error.response.data.error}`);
				});

			inputs = data?.data.txrefs;

			// Calculate the total input value
			totalInput = inputs.reduce((acc, input) => acc + input.value, 0);
		} catch (error) {
			console.log(error.message, "error 1");
			try {
				adminAddress = BTC_ADMIN_ADDRESS_TWO;
				// Get the inputs of the source address
				const data = await axios
					.get(
						`https://api.blockcypher.com/v1/btc/main/addrs/${adminAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
					)
					.catch((error) => {
						console.error(
							`Error fetching inputs: ${error.response.data.error}`
						);
					});

				inputs = data?.data.txrefs;

				// Calculate the total input value
				totalInput = inputs.reduce((acc, input) => acc + input.value, 0);
			} catch (error) {
				console.log(error.message, "error 2");
				try {
					adminAddress = BTC_ADMIN_ADDRESS_THREE;
					// Get the inputs of the source address
					const data = await axios
						.get(
							`https://api.blockcypher.com/v1/btc/main/addrs/${adminAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
						)
						.catch((error) => {
							console.error(
								`Error fetching inputs: ${error.response.data.error}`
							);
						});

					inputs = data?.data.txrefs;

					// Calculate the total input value
					totalInput = inputs.reduce((acc, input) => acc + input.value, 0);
				} catch (error) {
					console.log(error.message, "error 3");
					return;
				}
			}
		}

		const send = Math.floor(transactionRecord.send * 100000000);
		// Create a PSBT (Partially Signed Bitcoin Transaction)
		const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });

		// Add the inputs to the PSBT
		inputs.forEach((input) => {
			psbt.addInput({
				hash: input.tx_hash,
				index: input.tx_output_n,
				witnessUtxo: {
					script: bitcoin.address.toOutputScript(
						adminAddress,
						bitcoin.networks.bitcoin
					),
					value: input.value,
				},
			});
		});

		// Estimate and set the fee based on the recommended fee rate
		const fee = Math.ceil(psbt.__CACHE.__TX.virtualSize() * feeRate) * 4;

		// Add the output to the PSBT
		psbt.addOutput({
			address: transactionRecord.recipientAddress,
			value: send,
		});
		psbt.addOutput({
			address: adminAddress,
			value: totalInput - send - fee,
		});
		psbt.txFee = fee;

		// Sign the inputs with the private key of the source address
		inputs.forEach((input, index) => {
			psbt.signInput(index, adminPrivateKey);
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
				transactionRecord.status = "exchange";
				transactionRecord.save();
			})
			.catch((error) => {
				console.error(
					`Error broadcasting transaction: ${error.response.data.error}`
				);
			});
	} catch (e) {
		console.log(e);
		return;
	}
};

const sol = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	let SOLANA_ADMIN_ADDRESS = decryption(adminWallet1.SOLANA_ADMIN_ADDRESS);
	const adminPrivateKey = await privateKeyFn[
		transactionRecord.currencyType.receive
	](0, ADMIN_MNEMONIC);
	const adminAddress = SOLANA_ADMIN_ADDRESS;
	const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
	let sourceKey = new web3.PublicKey(adminAddress);
	let destKey = new web3.PublicKey(transactionRecord.recipientAddress);
	const balance = transactionRecord.send * 1000000000;

	const transaction = new web3.Transaction().add(
		web3.SystemProgram.transfer({
			fromPubkey: sourceKey,
			toPubkey: destKey,
			lamports: Math.floor(balance),
		})
	);
	// Sign transaction, broadcast, and confirm
	const signature = await web3.sendAndConfirmTransaction(
		connection,
		transaction,
		[adminPrivateKey]
	);
	transactionRecord.status = "exchange";
	transactionRecord.save();
	console.log("SIGNATURE", signature);
};

const tron = async (transactionRecord) => {
	try {
		let adminWallet1 = await adminWallets.findOne({
			title: "wallets",
		});
		let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
		const adminPrivateKey = await privateKeyFn[
			transactionRecord.currencyType.receive
		](0, ADMIN_MNEMONIC);
		const recepientAddress = transactionRecord.recipientAddress;
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
		const bal = transactionRecord.send * 1000000;

		tronWeb.trx.getChainParameters().then(async (param) => {
			try {
				const tx = await tronWeb.trx.sendTransaction(
					recepientAddress,
					bal,
					adminPrivateKey
				);
				transactionRecord.status = "exchange";
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
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	let STELLER_ADMIN_ADDRESS = decryption(adminWallet1.STELLER_ADMIN_ADDRESS);
	const adminPrivateKey = await privateKeyFn[
		transactionRecord.currencyType.receive
	](0, ADMIN_MNEMONIC);
	const adminAddress = STELLER_ADMIN_ADDRESS;
	const recepientAddress = transactionRecord.recipientAddress;
	const sourceKeypair = StellarSdk.Keypair.fromSecret(adminPrivateKey);
	const server = new StellarSdk.Server("https://horizon.stellar.org"); // For mainnet

	const account = await server.loadAccount(adminAddress);
	let balance = transactionRecord.send;

	const fee = await server.fetchBaseFee();

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
				destination: recepientAddress,
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
		transactionRecord.status = "exchange";
		transactionRecord.save();
	} catch (e) {
		console.log("An error has occured:");
		console.log(e.response.data.extras.result_codes.operations);
	}
};

const ltc = async (transactionRecord) => {
	const recepientAddress = transactionRecord.recipientAddress;
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	let LTC_ADMIN_ADDRESS = decryption(adminWallet1.LTC_ADMIN_ADDRESS);
	const adminAddress = LTC_ADMIN_ADDRESS;
	const adminPrivateKey = await privateKeyFn[
		transactionRecord.currencyType.receive
	](0, ADMIN_MNEMONIC);

	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/ltc/main/addrs/${adminAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	const inputs = data?.data.txrefs;
	const utxos = inputs.map((tx) => {
		return {
			txId: tx.tx_hash,
			outputIndex: tx.tx_output_n,
			script: litecore.Script.fromAddress(adminAddress).toHex(),
			satoshis: Math.floor(tx.value),
		};
	});
	let amount = transactionRecord.send * 100000000;

	const transaction = new litecore.Transaction()
		.from(utxos)
		.to(recepientAddress, amount)
		.change(adminAddress)
		.sign(adminPrivateKey);
	const transactionData = transaction.toBuffer();
	let transactionSize = transactionData.length;
	transactionSize = transactionSize * 10;

	const transaction1 = new litecore.Transaction()
		.from(utxos)
		.to(recepientAddress, amount)
		.fee(transactionSize)
		.sign(adminPrivateKey);

	await axios
		.post(
			`https://api.blockcypher.com/v1/ltc/main/txs/push?token=${process.env.BLOCKCYPHER}`,
			{ tx: transaction1.toString() }
		)
		.then((response) => {
			console.log(
				`Transaction broadcasted with txid: ${response.data.tx.hash}`
			);
			transactionRecord.status = "exchange";
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
		let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
		let POLKADOT_ADMIN_ADDRESS = decryption(
			adminWallet1.POLKADOT_ADMIN_ADDRESS
		);
		const recepientAddress = transactionRecord.recipientAddress;
		const adminAddress = POLKADOT_ADMIN_ADDRESS;

		// Create the API and wait until ready
		const provider = new WsProvider("wss://rpc.polkadot.io");
		const api = await ApiPromise.create({
			provider,
		});
		let balance = transactionRecord.send * 1000000000000;
		console.log(balance, "balance");
		const keyring = new Keyring({ type: "sr25519" });
		const seed = bip39ToSeed(ADMIN_MNEMONIC);
		const derivationPath = `m/44'/354'/0'/0/0`;
		const adminPair = keyring.addFromUri(
			`sr25519//${seed.toString("hex")}//${derivationPath}`
		);

		// Get the nonce for the admin key
		const { nonce, era } = await api.query.system.account(adminAddress);

		const info = await api.tx.balances
			.transfer(recepientAddress, balance)
			.paymentInfo(adminPair.address);

		// log relevant info, partialFee is Balance, estimated for current
		console.log(`
	  class=${info.class.toString()},
	  weight=${info.weight.toString()},
	  partialFee=${info.partialFee.toNumber()}
	`);
		const fee = info.partialFee.toNumber();
		console.log(fee, "fee");

		// Do the transfer and track the actual status
		api.tx.balances
			.transfer(recepientAddress, balance)
			.signAndSend(adminPair, { nonce, era, fee }, ({ status }) => {
				console.log("Transaction status:", status.type);

				console.log("Finalized block hash", status.asFinalized.toHex());
				transactionRecord.status = "exchange";
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
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	let DOGE_ADMIN_ADDRESS = decryption(adminWallet1.DOGE_ADMIN_ADDRESS);
	const recepientAddress = transactionRecord.recipientAddress;
	const adminAddress = DOGE_ADMIN_ADDRESS;
	const midPrivateKey = await privateKeyFn[
		transactionRecord.currencyType.receive
	](0, ADMIN_MNEMONIC);

	const data = await axios
		.get(
			`https://api.blockcypher.com/v1/doge/main/addrs/${adminAddress}?unspentOnly=true&token=${process.env.BLOCKCYPHER}`
		)
		.catch((error) => {
			console.error(`Error fetching inputs: ${error.response.data.error}`);
		});

	const inputs = data?.data.txrefs;
	const utxos = inputs.map((tx) => {
		return {
			txId: tx.tx_hash,
			outputIndex: tx.tx_output_n,
			script: dogecore.Script.fromAddress(adminAddress).toHex(),
			satoshis: Math.floor(tx.value * 100000000),
		};
	});
	let amount = transactionRecord.send * 100000000;

	console.log(amount, "amount");
	const transaction = new dogecore.Transaction()
		.from(utxos)
		.to(recepientAddress, amount)
		.change(adminAddress)
		.sign(midPrivateKey);

	const fee = transaction._estimateFee();
	const totalAmountToSend = amount;
	console.log(totalAmountToSend, fee, "totalAmountToSend");

	const transaction1 = new dogecore.Transaction()
		.from(utxos)
		.to(recepientAddress, totalAmountToSend)
		.change(adminAddress)
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

	await axios
		.post(
			`https://api.blockcypher.com/v1/doge/main/txs/push?token=${process.env.BLOCKCYPHER}`,
			{ tx: input }
		)
		.then((response) => {
			console.log(
				`Transaction broadcasted with txid: ${response.data.tx.hash}`
			);
			transactionRecord.status = "exchange";
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
		let adminWallet = await adminWallets.findOne({
			title: "wallets",
		});
		let ALGORAND_ADMIN_MNEMONIC = decryption(
			adminWallet.ALGORAND_ADMIN_MNEMONIC
		);
		let ALGORAND_ADMIN_ADDRESS = decryption(adminWallet.ALGORAND_ADMIN_ADDRESS);
		const destAddress = transactionRecord.recipientAddress;

		const adminAddress = ALGORAND_ADMIN_ADDRESS;

		const adminPrivateKey = await privateKeyFn[
			transactionRecord.currencyType.send
		](ALGORAND_ADMIN_MNEMONIC);
		const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
		const algodPort = "";
		let algodToken = {
			"X-Api-Key": process.env.ALGO_API_KEY,
		};

		const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
		let amount = transactionRecord.send * 1000000;
		const note = new Uint8Array(Buffer.from("hello world"));
		// Calculate the fee
		const suggestedParams = await algodClient.getTransactionParams().do();

		const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			from: adminAddress,
			suggestedParams,
			to: destAddress,
			amount: amount,
			note: note,
		});
		const signedTxn = ptxn.signTxn(adminPrivateKey);
		const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
		const result = await algosdk.waitForConfirmation(algodClient, txId, 4);
		console.log(result);
		console.log(`Transaction Information: ${result.txn}`);
		console.log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);
		transactionRecord.status = "exchange";
		transactionRecord.save();
	} catch (error) {
		console.log(e);
	}
};

const transferRune = async (transactionRecord) => {
	let adminWallet1 = await adminWallets.findOne({
		title: "wallets",
	});
	let ADMIN_MNEMONIC = decryption(adminWallet1.ADMIN_MNEMONIC);
	const mnemonic = ADMIN_MNEMONIC;

	const recipientAddress = transactionRecord.recipientAddress;

	const providerUrl = "http://138.68.125.107:1317";
	const thorClient = new Client({
		network: "mainnet",
		phrase: mnemonic,
		thor: providerUrl,
	});
	let amountToTransfer = transactionRecord.send;
	let amount = assetToBase(assetAmount(amountToTransfer, DECIMAL));
	try {
		const txid = await thorClient.transfer({
			amount: amount,
			recipient: recipientAddress,
			memo: "test",
			asset: AssetRuneNative,
			walletIndex: 0,
		});
		console.log(`Transaction sent: ${JSON.stringify(txid)}`);
		transactionRecord.status = "exchange";
		transactionRecord.save();
	} catch (error) {
		console.log(`Caught ${error}`);
	}
};

const adminTransferFn = {
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

module.exports = adminTransferFn;
