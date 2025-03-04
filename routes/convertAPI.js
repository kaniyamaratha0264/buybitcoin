const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		const {
			data: {
				data: { quote: converted },
			},
		} = await axios.get(
			`https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&convert_id=${req.body.receive}&id=${req.body.send}`,
			{
				headers: {
					"X-CMC_PRO_API_KEY": "7d724422-a062-4e32-9900-159c9404d760",
				},
			}
		);

		res.send(converted[0]);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
