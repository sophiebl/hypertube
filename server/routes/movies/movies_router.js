const express = require("express");

const router = express.Router();
require("./comments")(router);
require("./find")(router); // /api/users/login


module.exports = router;
