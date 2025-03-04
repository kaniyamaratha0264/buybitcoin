var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

var convertAPI = require("./routes/convertAPI");
var index = require("./routes/index");
var usersRouter = require("./routes/users");
const createTransaction = require("./routes/createTransaction");
const ApiRouter = require("./routes/transfer");
const KycRouter = require("./routes/kyc");
const BlogRouter = require("./routes/blogs");
const walletRouter = require("./routes/wallets");
const logoRouter = require('./routes/logo.route')

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./dist"));

app.use("/convertapi", convertAPI);
app.use("/index", index);
app.use("/users", usersRouter);
app.use("/wallet", createTransaction);
app.use("/getRecord", ApiRouter);
app.use("/kyc", KycRouter);
app.use("/blogs", BlogRouter);
app.use("/wallets", walletRouter);
app.use("/logo", logoRouter);

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "./dist/index.html"), function (err) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
	});
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	next(createError(404));
	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_DB, { useNewUrlParser: true })
	.then(() => console.log("Connected to Mongodb"))
	.catch((error) => console.log(error.message));

module.exports = app;
