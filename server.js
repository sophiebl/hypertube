require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const deleteOldMovies = require('./deleteOldMovies')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./server/config/passport");
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "build")));
app.use(passport.initialize());

app.use("/api/users", require("./server/routes/user_router"));
app.use("/api/images", require("./server/routes/images/images_router"));
app.use("/api/home", require("./server/routes/home/home_router"));
app.use("/api/player", require("./server/routes/player/player_router"));
app.use("/api/movies", require("./server/routes/movies/movies_router"));

deleteOldMovies()

// UserModel.findAll().then(users => {
// console.log("All users:", users);
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening!`);
});
