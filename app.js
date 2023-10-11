const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./src/router/usersRouter.js");

const app = express();

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/users", users);

// MongoDB connection
try {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(console.log("Connected to MongoDB"));
} catch (e) {
	console.error(`Error connecting to MongoDB: ${e}`);
}

//mail
// try {
// 	await mailTransporter.verify();
// 	console.log("SMTP server authentification succeed");
// } catch (e) {
// 	console.error(`Error connecting to mail: ${e}`);
// }

module.exports = app;