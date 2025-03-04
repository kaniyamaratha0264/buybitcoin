let mongoose = require("mongoose");

let login = new mongoose.Schema({
	address: String,
});
let MetamaskLogin = mongoose.model("metamaskLogin", login);

module.exports = MetamaskLogin;
