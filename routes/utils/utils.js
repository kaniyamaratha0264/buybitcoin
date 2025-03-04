const axios = require("axios");

async function coinMarketCapConvert(receive, send, amount) {
	const {
		data: {
			data: { quote: converted },
		},
	} = await axios.get(
		`https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=${amount}&convert_id=${receive}&id=${send}`,
		{
			headers: {
				"X-CMC_PRO_API_KEY": "7d724422-a062-4e32-9900-159c9404d760",
			},
		}
	);
	return converted[0];
}

module.exports = coinMarketCapConvert;
