require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const userRouter = require("./server/routes/user_router");
const { sequelize } = require("./server/models/index");
const UserModel = sequelize.import("./server/models/user");

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./server/routes/user_router"));

UserModel.findAll().then(users => {
  console.log("All users:", users);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening!`);
});
