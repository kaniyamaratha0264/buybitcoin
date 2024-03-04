const express = require("express");
var router = express.Router();
let { adminWallets, decryption } = require("../modals/adminWallets");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.post("/change", auth, admin, async function (req, res) {
	try {
		let {
			algorand_admin_mnemonic,
			admin_mnemonic,
			algorand_admin_address,
			evm_admin_address,
			btc_admin_address_one,
			btc_admin_address_two,
			btc_admin_address_three,
			ltc_admin_address,
			doge_admin_address,
			solana_admin_address,
			tron_admin_address,
			stellar_admin_address,
			polkadot_admin_address,
			thor_admin_address,
		} = req.body;

		let adminWallet = await adminWallets.findOne({
			title: "wallets",
		});

		if (!adminWallet) {
			let createAdminWallet = new adminWallets({
				ALGORAND_ADMIN_MNEMONIC: algorand_admin_mnemonic,
				ADMIN_MNEMONIC: admin_mnemonic,
				ALGORAND_ADMIN_ADDRESS: algorand_admin_address,
				EVM_ADMIN_ADDRESS: evm_admin_address,
				BTC_ADMIN_ADDRESS_ONE: btc_admin_address_one,
				BTC_ADMIN_ADDRESS_TWO: btc_admin_address_two,
				BTC_ADMIN_ADDRESS_THREE: btc_admin_address_three,
				LTC_ADMIN_ADDRESS: ltc_admin_address,
				DOGE_ADMIN_ADDRESS: doge_admin_address,
				SOLANA_ADMIN_ADDRESS: solana_admin_address,
				TRON_ADMIN_ADDRESS: tron_admin_address,
				STELLER_ADMIN_ADDRESS: stellar_admin_address,
				POLKADOT_ADMIN_ADDRESS: polkadot_admin_address,
				THOR_ADMIN_ADDRESS: thor_admin_address,
			});
			await createAdminWallet.encryption();
			await createAdminWallet.save();
			return res.status(200).send("Successfully updated");
		}

		adminWallet.ALGORAND_ADMIN_MNEMONIC = algorand_admin_mnemonic;
		adminWallet.ADMIN_MNEMONIC = admin_mnemonic;
		adminWallet.ALGORAND_ADMIN_ADDRESS = algorand_admin_address;
		adminWallet.EVM_ADMIN_ADDRESS = evm_admin_address;
		adminWallet.BTC_ADMIN_ADDRESS_ONE = btc_admin_address_one;
		adminWallet.BTC_ADMIN_ADDRESS_TWO = btc_admin_address_two;
		adminWallet.BTC_ADMIN_ADDRESS_THREE = btc_admin_address_three;
		adminWallet.LTC_ADMIN_ADDRESS = ltc_admin_address;
		adminWallet.DOGE_ADMIN_ADDRESS = doge_admin_address;
		adminWallet.SOLANA_ADMIN_ADDRESS = solana_admin_address;
		adminWallet.TRON_ADMIN_ADDRESS = tron_admin_address;
		adminWallet.STELLER_ADMIN_ADDRESS = stellar_admin_address;
		adminWallet.POLKADOT_ADMIN_ADDRESS = polkadot_admin_address;
		adminWallet.THOR_ADMIN_ADDRESS = thor_admin_address;
		await adminWallet.encryption();
		adminWallet.save();

		return res.status(200).send("Successfully updated");
	} catch (err) {
		console.log(err.message);
	}
});

router.get("/", auth, admin, async function (req, res) {
	try {
		let adminWallet = await adminWallets.findOne({
			title: "wallets",
		});

		if (adminWallet) {
			let wallets = {
				algorand_admin_mnemonic: decryption(
					adminWallet.ALGORAND_ADMIN_MNEMONIC
				),
				admin_mnemonic: decryption(adminWallet.ADMIN_MNEMONIC),
				algorand_admin_address: decryption(adminWallet.ALGORAND_ADMIN_ADDRESS),
				evm_admin_address: decryption(adminWallet.EVM_ADMIN_ADDRESS),
				btc_admin_address_one: decryption(adminWallet.BTC_ADMIN_ADDRESS_ONE),
				btc_admin_address_two: decryption(adminWallet.BTC_ADMIN_ADDRESS_TWO),
				btc_admin_address_three: decryption(
					adminWallet.BTC_ADMIN_ADDRESS_THREE
				),
				ltc_admin_address: decryption(adminWallet.LTC_ADMIN_ADDRESS),
				doge_admin_address: decryption(adminWallet.DOGE_ADMIN_ADDRESS),
				solana_admin_address: decryption(adminWallet.SOLANA_ADMIN_ADDRESS),
				tron_admin_address: decryption(adminWallet.TRON_ADMIN_ADDRESS),
				stellar_admin_address: decryption(adminWallet.STELLER_ADMIN_ADDRESS),
				polkadot_admin_address: decryption(adminWallet.POLKADOT_ADMIN_ADDRESS),
				thor_admin_address: decryption(adminWallet.THOR_ADMIN_ADDRESS),
			};
			return res.status(200).send(wallets);
		}

		return res.status(400).send("No wallets found");
	} catch (err) {
		console.log(err.message);
	}
});


router.get("/getWallet", async function (req, res) {
	try {
		const currencyType = req.query.currency
		let adminWallet = await adminWallets.findOne({
			title: "wallets",
		});

		if (adminWallet) {
			let wallets = {
				algorand_admin_mnemonic: decryption(
					adminWallet.ALGORAND_ADMIN_MNEMONIC
				),
				admin_mnemonic: decryption(adminWallet.ADMIN_MNEMONIC),
				algorand_admin_address: decryption(adminWallet.ALGORAND_ADMIN_ADDRESS),
				evm_admin_address: decryption(adminWallet.EVM_ADMIN_ADDRESS),
				btc_admin_address_one: decryption(adminWallet.BTC_ADMIN_ADDRESS_ONE),
				btc_admin_address_two: decryption(adminWallet.BTC_ADMIN_ADDRESS_TWO),
				btc_admin_address_three: decryption(
					adminWallet.BTC_ADMIN_ADDRESS_THREE
				),
				ltc_admin_address: decryption(adminWallet.LTC_ADMIN_ADDRESS),
				doge_admin_address: decryption(adminWallet.DOGE_ADMIN_ADDRESS),
				solana_admin_address: decryption(adminWallet.SOLANA_ADMIN_ADDRESS),
				tron_admin_address: decryption(adminWallet.TRON_ADMIN_ADDRESS),
				stellar_admin_address: decryption(adminWallet.STELLER_ADMIN_ADDRESS),
				polkadot_admin_address: decryption(adminWallet.POLKADOT_ADMIN_ADDRESS),
				thor_admin_address: decryption(adminWallet.THOR_ADMIN_ADDRESS),
			};

			switch (currencyType.toUpperCase()) {
				case "ALGO":
					return res.status(200).send({ address: wallets.algorand_admin_address });
				case "ETH":
					return res.status(200).send({ address: wallets.evm_admin_address });
				case "BTC":
					return res.status(200).send({ address: wallets.btc_admin_address_one });
				case "LTC":
					return res.status(200).send({ address: wallets.ltc_admin_address });
				case "DOGE":
					return res.status(200).send({ address: wallets.doge_admin_address });
				case "SOL":
					return res.status(200).send({ address: wallets.solana_admin_address });
				case "TRX":
					return res.status(200).send({ address: wallets.tron_admin_address });
				case "XLM":
					return res.status(200).send({ address: wallets.stellar_admin_address });
				case "DOT":
					return res.status(200).send({ address: wallets.polkadot_admin_address });
				case "RUN":
					return res.status(200).send({ address: wallets.thor_admin_address });
				default:
					return res.status(200).send({ address: wallets.btc_admin_address_one });
			}
		}

		return res.status(400).send("No wallets found");
	} catch (err) {
		console.log(err.message);
	}
});

module.exports = router;
