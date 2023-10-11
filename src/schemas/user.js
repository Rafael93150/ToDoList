const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	birthdate: Date,
	password: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
