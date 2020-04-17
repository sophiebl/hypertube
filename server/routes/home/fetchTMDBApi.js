const request = require("request");

module.exports = (app) => {
  app.get("/fetchTMDBApi", (req, res, next) => {
    request({
      uri: "https://api.themoviedb.org/3/movie/76341",
      headers: {
        Authorization: "Bearer " + process.env.TMDB_ACCESS_TOKEN,
      },
    }).pipe(res);
  });
};
