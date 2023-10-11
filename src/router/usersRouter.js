const express = require("express");
const { createUser } = require("../routes/usersRoutes.js");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
