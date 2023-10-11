const User = require("../models/user.js");

const createUser = async (req, res) => {
	try {
		const user = new User({
			...req.body,
		});
		user.saveToDatabase();
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the user : ${error}`,
		});
	}
};

module.exports = { createUser };