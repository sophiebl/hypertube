const express = require("express");

const router = express.Router();
require("./createComment")(router);
require("./getComments")(router);
require("./find")(router); // /api/users/login


module.exports = router;
