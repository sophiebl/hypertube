const express = require("express");

const router = express.Router();
require("./uploadImage")(router); // /api/users/login

module.exports = router;
