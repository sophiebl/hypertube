const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config();
app.use(express.static(path.join(__dirname, "build")));
console.log("dev username", process.env.DEV_DB_USERNAME);

app.get("/api", function(req, res) {
  return res.send("pong");
});
app.get("/users", function(req, res) {
  return res.send("c'est mes users");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening!`);
});
