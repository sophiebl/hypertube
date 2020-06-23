const {languages} = require('./shared')
const passport = require("passport");
const yifysubtitles = require("yifysubtitles");
const fs = require("fs");


const subtitles = async (req, res) => {
  const arr = [];
  const idIMDB = req.params.id;
  const dir = `/tmp/subs/${idIMDB}`;
  if (!fs.existsSync(dir))
    fs.mkdirSync(`/tmp/subs/${idIMDB}`, { recursive: true });
  yifysubtitles(idIMDB, {
    path: dir,
    languages: languages,
  })
    .then(async (data) => {
      await Promise.all(
        data.map(async (e) => {
          return await (async () => {
            let newPath = `/tmp/subs/${idIMDB}/${e.langShort}.vtt`;
            if (fs.existsSync(e.path)) {
              fs.rename(e.path, newPath, () => {});
              arr.push({
                lang: e.langShort,
                path: `/api/player/getsubtitles/${idIMDB}/${e.langShort}`,
              });
              return Promise.resolve();
            }
          })();
        })
      );
      res.status(200).send(arr);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Subtitles not found" });
    });
};

module.exports = (app) => {
  app.get(
    "/subtitles/:id",
    passport.authenticate("jwt", { session: false }),
    subtitles
  );
};