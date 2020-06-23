const {languages} = require('./shared')
const passport = require("passport");
const fs = require('fs')
const readSubtitles = async (req, res) => {
  const arr = [];
  const idIMDB = req.params.id;
  const language = req.params.language;
  const file = `/tmp/subs/${idIMDB}/${language}.vtt`;
  if (fs.existsSync(file)) {
    res.download(file)
  } else {
    res.status(400).send({ message: "Subtitles not found" });
  }
};

module.exports = (app) => {
  app.get(
    "/getsubtitles/:id/:language",
    readSubtitles
  );
};